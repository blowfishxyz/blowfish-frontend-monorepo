import { ReportIcon } from "@blowfish/protect-ui/icons";
import { Button } from "@blowfishxyz/ui";
import React from "react";

export function ReportBtn({
  variant,
  onReport,
}: {
  onReport: () => Promise<void>;
  variant: "small" | "large";
}) {
  const [reporting, setReporting] = React.useState(false);
  const [reported, setReported] = React.useState(false);
  const handleClick = async () => {
    setReporting(true);
    try {
      await onReport();
      setReporting(false);
      setReported(true);
    } catch (_) {
      setReporting(false);
    }
  };

  if (reported) {
    return (
      <Button
        size="sm"
        design={variant === "small" ? "secondary" : undefined}
        stretch
        disabled
      >
        {variant === "small" ? "Reported" : "Reported. Thanks!"}
      </Button>
    );
  }

  return (
    <Button
      size="sm"
      design={variant === "small" ? "secondary" : undefined}
      loading={reporting}
      stretch
      onClick={handleClick}
    >
      {variant === "small" ? undefined : <ReportIcon />}
      {variant === "small" ? "Report" : "Report to Blowfish"}
    </Button>
  );
}
