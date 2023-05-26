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
import { Column, Row, Text, Button } from "@blowfish/ui/core";
import { styled } from "styled-components";
import { useMemo, useState } from "react";
import { logger } from "~utils/logger";

interface ModalOptions {
  blocking?: boolean;
  initialOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function useModal({
  initialOpen = true,
  blocking = false,
}: ModalOptions = {}) {
  const [open, setOpen] = React.useState(initialOpen);
  const labelId = useId();
  const descriptionId = useId();

  const data = useFloating({
    open,
    onOpenChange: setOpen,
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
      cb: () => Promise<void>;
      design?: "primary" | "danger";
      closeOnComplete?: boolean;
    }
  | (() => Promise<void>);

type ModalProps = {
  title: string;
  description: React.ReactNode;
  content?: React.ReactNode;
  footerContent?: React.ReactNode;
  action?: ModalAction;
  width?: number;
  options?: ModalOptions;
  onCancel?: () => void;
};

export function Modal({
  content,
  footerContent,
  title,
  action,
  width,
  description,
  onCancel,
  options,
}: ModalProps) {
  const modal = useModal(options);

  return (
    <ModalContext.Provider value={modal}>
      <ModalContent width={width}>
        <Column height="100%" justifyContent="space-between">
          <Column>
            <Text
              id={modal.labelId}
              size="xl"
              weight="semi-bold"
              marginBottom={12}
            >
              {title}
            </Text>
            <Text id={modal.descriptionId} size="md" design="secondary">
              {description}
            </Text>
            {content}
          </Column>
          <Row justifyContent="flex-end" gap="md" marginTop={24}>
            {footerContent}
            {!options?.blocking && (
              <Button
                design={action ? "secondary" : "primary"}
                onClick={() => {
                  onCancel?.();
                  modal.hide();
                }}
              >
                Cancel
              </Button>
            )}

            {action && <ModalActionButton action={action} close={modal.hide} />}
          </Row>
        </Column>
      </ModalContent>
    </ModalContext.Provider>
  );
}

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
      loading={loading}
      design={typeof action !== "function" ? action.design : undefined}
      onClick={async () => {
        setLoading(true);
        try {
          await actionFn();
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
