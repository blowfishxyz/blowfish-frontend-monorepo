import * as React from "react";
import {
  useFloating,
  useClick,
  useDismiss,
  useRole,
  useInteractions,
  useMergeRefs,
  FloatingPortal,
  FloatingOverlay,
  useId,
} from "@floating-ui/react";
import { Column, Text, Button } from "@blowfish/ui/core";
import { styled } from "styled-components";
import { useMemo, useState } from "react";
import { logger } from "~utils/logger";

interface ModalOptions {
  blocking?: boolean;
  initialOpen?: boolean;
  onClose?: () => void;
}

export function useModal({
  initialOpen = true,
  blocking = false,
  onClose,
}: ModalOptions = {}) {
  const [open, setOpen] = React.useState(initialOpen);
  const labelId = useId();
  const descriptionId = useId();

  const data = useFloating({
    open,
    onOpenChange: (nextOpen: boolean) => {
      setOpen(nextOpen);
      if (!nextOpen) {
        onClose?.();
      }
    },
  });

  const context = data.context;

  const click = useClick(context, {
    enabled: true,
  });
  const dismiss = useDismiss(context, {
    enabled: !blocking,
    outsidePressEvent: "mousedown",
  });
  const role = useRole(context);

  const interactions = useInteractions([click, dismiss, role]);

  return React.useMemo(
    () => ({
      isOpen: open,
      hide: () => setOpen(false),
      ...interactions,
      labelId,
      descriptionId,
      ...data,
    }),
    [open, setOpen, interactions, data, labelId, descriptionId]
  );
}

type ContextType = ReturnType<typeof useModal> | null;

const ModalContext = React.createContext<ContextType>(null);

export const useModalContext = () => {
  const context = React.useContext(ModalContext);

  if (context == null) {
    throw new Error("Modal components must be wrapped in <Modal />");
  }

  return context;
};

type ModalAction =
  | {
      title?: string;
      cb: (() => void) | ((hide: () => void) => Promise<void>);
      design?: "primary" | "danger";
      closeOnComplete?: boolean;
      priority?: "primary" | "tertiary";
    }
  | ((hide: () => void) => Promise<void>);

type ModalProps = {
  title: string;
  description: React.ReactNode;
  content?: React.ReactNode;
  action?: ModalAction;
  width?: number;
  options?: ModalOptions;
  onCancel?: () => void;
  cancelText?: React.ReactElement;
};

export function Modal({
  title,
  content,
  action,
  width,
  description,
  onCancel,
  options,
  cancelText,
}: ModalProps) {
  const modal = useModal({ ...options, onClose: onCancel || options?.onClose });
  const priority = typeof action !== "function" ? action?.priority : undefined;

  return (
    <ModalContext.Provider value={modal}>
      <ModalContent width={width}>
        <Column height="100%" justifyContent="space-between">
          <Column alignItems="center" alignSelf="center" gap="md">
            {content ? content : null}
            <Text
              id={modal.labelId}
              size="xl"
              weight="semi-bold"
              textAlign="center"
              maxWidth="90%"
            >
              {title}
            </Text>
            <Text
              id={modal.descriptionId}
              textAlign="center"
              size="md"
              design="secondary"
              maxWidth="90%"
            >
              {description}
            </Text>
          </Column>
          <Column gap="sm" marginTop={action ? 20 : 36}>
            {action && <ModalActionButton action={action} close={modal.hide} />}
            {(!options?.blocking || onCancel) && (
              <StyledModalButton
                stretch
                design={action && !priority ? "tertiary" : "primary"}
                size={action && !priority ? "sm" : "md"}
                onClick={() => {
                  onCancel?.();
                  modal.hide();
                }}
                priority={priority === "primary"}
              >
                {cancelText ? cancelText : "Cancel"}
              </StyledModalButton>
            )}
          </Column>
        </Column>
      </ModalContent>
    </ModalContext.Provider>
  );
}

const StyledModalButton = styled(Button)<{ priority?: boolean }>`
  order: ${({ priority }) => (priority ? -1 : 0)};
`;

const ModalActionButton: React.FC<{
  action: ModalAction;
  close: () => void;
}> = ({ action, close }) => {
  const [loading, setLoading] = useState(false);
  const actionFn = useMemo(() => {
    if (typeof action === "function") {
      return action;
    }

    return action.cb;
  }, [action]);

  const closeOnComplete =
    typeof action === "function" || action.closeOnComplete;
  const title = typeof action !== "function" ? action.title : undefined;

  return (
    <Button
      stretch
      loading={loading}
      design={typeof action !== "function" ? action.design : undefined}
      onClick={async () => {
        setLoading(true);
        try {
          await actionFn(close);
          if (closeOnComplete) {
            close();
          }
        } catch (e) {
          logger.debug(e);
        }
        setLoading(false);
      }}
    >
      {title ?? "Confirm"}
    </Button>
  );
};

export const ModalContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLProps<HTMLDivElement> & { width?: number }
>(function ModalContent(props, propRef) {
  const { context: floatingContext, ...context } = useModalContext();
  const ref = useMergeRefs([context.refs.setFloating, propRef]);

  if (!floatingContext.open) return null;

  return (
    <FloatingPortal>
      <FloatingOverlay style={{ zIndex: 10 }} lockScroll>
        <Overlay
          width="100%"
          height="100%"
          backgroundColor="base30"
          justifyContent="center"
          alignItems="center"
          position="relative"
          zIndex={10}
        >
          <Column
            ref={ref}
            aria-labelledby={context.labelId}
            aria-describedby={context.descriptionId}
            {...context.getFloatingProps(props)}
            padding={26}
            paddingBottom={16}
            borderRadius={12}
            width={props.width || 400}
            position="relative"
            backgroundColor="backgroundPrimary"
            withBorder
          >
            {props.children}
          </Column>
        </Overlay>
      </FloatingOverlay>
    </FloatingPortal>
  );
});

const Overlay = styled(Column)`
  backdrop-filter: blur(17px);
`;
