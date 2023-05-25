import * as React from "react";
import {
  useFloating,
  useClick,
  useDismiss,
  useRole,
  useInteractions,
  useMergeRefs,
  FloatingPortal,
  FloatingFocusManager,
  FloatingOverlay,
  useId,
} from "@floating-ui/react";
import { Column, Row, Text, Button, Spinner } from "@blowfish/ui/core";
import { styled } from "styled-components";
import { useAsyncFn } from "react-use";

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
      open,
      setOpen,
      ...interactions,
      labelId,
      descriptionId,
      ...data,
    }),
    [open, setOpen, interactions, data]
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

type ModalProps = {
  title: string;
  description: React.ReactNode;
  content?: React.ReactNode;
  footerContent?: React.ReactNode;
  action?: () => Promise<void>;
  actionTitle?: string;
  closeAfterAction?: boolean;
  options?: ModalOptions;
};

const noop = () => Promise.resolve();

export function Modal({
  content,
  footerContent,
  title,
  action,
  actionTitle,
  closeAfterAction = true,
  description,
  options,
}: ModalProps) {
  const modal = useModal(options);
  const [state, actionAsync] = useAsyncFn(action || noop);

  return (
    <ModalContext.Provider value={modal}>
      <ModalContent>
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
                onClick={() => modal.setOpen(false)}
              >
                Close
              </Button>
            )}

            {action && (
              <Button
                loading={state.loading}
                onClick={async () => {
                  await actionAsync();
                  if (closeAfterAction) {
                    modal.setOpen(false);
                  }
                }}
              >
                {actionTitle || "Confirm"}
              </Button>
            )}
          </Row>
        </Column>
      </ModalContent>
    </ModalContext.Provider>
  );
}

export const ModalContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLProps<HTMLDivElement>
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
          {/* <FloatingFocusManager context={floatingContext}> */}
          <Column
            ref={ref}
            aria-labelledby={context.labelId}
            aria-describedby={context.descriptionId}
            {...context.getFloatingProps(props)}
            padding={26}
            paddingBottom={16}
            borderRadius={12}
            width={400}
            position="relative"
            backgroundColor="backgroundPrimary"
            withBorder
          >
            {props.children}
          </Column>
          {/* </FloatingFocusManager> */}
        </Overlay>
      </FloatingOverlay>
    </FloatingPortal>
  );
});

const Overlay = styled(Column)`
  backdrop-filter: blur(17px);
`;
