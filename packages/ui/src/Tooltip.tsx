import { Placement, shift } from "@floating-ui/react";
import {
  FloatingArrow,
  FloatingPortal,
  arrow,
  autoUpdate,
  flip,
  offset,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useMergeRefs,
  useRole,
} from "@floating-ui/react";
import {
  cloneElement,
  createContext,
  forwardRef,
  isValidElement,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import styled from "styled-components";

interface TooltipOptions {
  initialOpen?: boolean;
  placement?: Placement;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  shouldCloseOnOutsideClick?: boolean;
}

type ReturnedUseTooltip = ReturnType<typeof useFloating> &
  ReturnType<typeof useInteractions> & {
    arrowRef: React.MutableRefObject<SVGSVGElement | null>;
    open: boolean;
    setOpen: (open: boolean) => void;
  };

const useTooltip = ({
  initialOpen = false,
  placement = "top",
  open: controlledOpen,
  onOpenChange: setControlledOpen,
  shouldCloseOnOutsideClick = true,
}: TooltipOptions): ReturnedUseTooltip => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(initialOpen);
  const arrowRef = useRef(null);
  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = setControlledOpen ?? setUncontrolledOpen;

  const data = useFloating({
    placement,
    open,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(10),
      flip(),
      shift(),
      arrow({
        element: arrowRef,
      }),
    ],
  });
  const context = data.context;

  const hover = useHover(context, {
    move: false,
    enabled: controlledOpen == null,
  });
  const focus = useFocus(context, {
    enabled: controlledOpen == null,
  });

  const dismiss = useDismiss(context, {
    outsidePress: shouldCloseOnOutsideClick,
  });
  const role = useRole(context, { role: "tooltip" });
  const interactions = useInteractions([hover, focus, dismiss, role]);

  return useMemo(
    () => ({
      open,
      setOpen,
      arrowRef,
      ...interactions,
      ...data,
    }),
    [open, setOpen, interactions, data]
  );
};

type TooltipContextType = ReturnType<typeof useTooltip> | null;

const TooltipContext = createContext<TooltipContextType>(null);

export const useTooltipContext = (): ReturnType<typeof useTooltip> => {
  const context = useContext(TooltipContext);

  if (context == null) {
    throw new Error("Tooltip components must be wrapped in <Tooltip />");
  }

  return context!;
};

export const Tooltip = ({
  children,
  ...options
}: { children: React.ReactNode } & TooltipOptions) => {
  // This can accept any props as options, e.g. `placement`,
  // or other positioning options.
  const tooltip = useTooltip(options);
  return (
    <TooltipContext.Provider value={tooltip}>
      {children}
    </TooltipContext.Provider>
  );
};

export const TooltipTrigger = forwardRef<
  HTMLElement,
  React.HTMLProps<HTMLElement>
>(function TooltipTrigger({ children, ...props }, propRef) {
  const context = useTooltipContext();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const childrenRef = (children as any).ref;
  const ref = useMergeRefs([context.refs.setReference, propRef, childrenRef]);

  if (isValidElement(children)) {
    return cloneElement(
      children,
      context.getReferenceProps({
        ref,
        ...props,
        ...children.props,
        "data-state": context.open ? "open" : "closed",
        style: { cursor: "pointer" },
      })
    );
  }

  return (
    <div
      ref={ref}
      // used to style the trigger based on the state
      data-state={context.open ? "open" : "closed"}
      {...context.getReferenceProps(props)}
    >
      {children}
    </div>
  );
});

const StyledTooltip = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
  border-radius: 7px;
  background: white;
  padding: 8px 12px;
`;

type TooltipContentProps = React.HTMLProps<HTMLDivElement> & {
  maxWidth?: number;
  showArrow?: boolean;
};

export const TooltipContent = forwardRef<HTMLDivElement, TooltipContentProps>(
  function TooltipContent(props, propRef) {
    const { style, children, maxWidth, showArrow = true, ...rest } = props;
    const context = useTooltipContext();
    const ref = useMergeRefs([context.refs.setFloating, propRef]);

    return (
      <FloatingPortal>
        {context.open && (
          <>
            <StyledTooltip
              ref={ref}
              {...context.getFloatingProps(rest)}
              style={{
                position: context.strategy,
                top: context.y ?? 0,
                left: context.x ?? 0,
                visibility: context.x == null ? "hidden" : "visible",
                maxWidth: `${maxWidth ?? 240}px`,
                ...style,
              }}
            >
              {children}
              {showArrow && (
                <FloatingArrow
                  ref={context.arrowRef}
                  context={context.context}
                  width={12}
                  height={5}
                  fill="white"
                  stroke="rgba(0, 0, 0, 0.1)"
                  strokeWidth={1}
                />
              )}
            </StyledTooltip>
          </>
        )}
      </FloatingPortal>
    );
  }
);
