import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCopy } from "@/hooks/useCopy";
import { CopyIcon, QrCode } from "lucide-react";
import generateQRCodeURL, { generateReadableQRCode } from "@/utils/table.utils";
import { useMutation } from "@tanstack/react-query";
import { updateTableQRCode } from "@/app/(dashboard)/tables/actions";
import AlertDestructive from "../alerts/AlertDestructive";

interface QRCodeDialogProps {
  defultValue: { tableId: string; table_no: string; qrCode: string };
  isOpen: boolean;
  onClose: () => void;
}

const QRCodeDialog: React.FC<QRCodeDialogProps> = ({
  defultValue,
  isOpen,
  onClose,
}) => {
  const [qrCode, setQrCode] = useState<string>(defultValue.qrCode || "");
  const [menuURL, setMenuURL] = useState<string>(
    generateQRCodeURL(defultValue.qrCode) || ""
  );
  const { copy, isCopied } = useCopy();
  const QRMutation = useMutation({
    mutationFn: (qrCode: string) =>
      updateTableQRCode(defultValue.tableId, qrCode),
    onSuccess(data) {
      setQrCode(data.data);
    },
  });

  useEffect(() => {
    setMenuURL(generateQRCodeURL(defultValue.qrCode));
  }, [qrCode]);

  const handleGenerateQRCode = () => {
    const generatedCode = generateReadableQRCode(); // Generate short unique code
    QRMutation.mutate(generatedCode);
  };

  const handleCopyQRCode = () => {
    if (qrCode) {
      copy(menuURL);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Generate QR Code for Table #{defultValue.table_no}
          </DialogTitle>
          {QRMutation.isError && (
            <AlertDestructive
              title="Failed to generate QR Code"
              description="Please try again after refreshing the page or contact IT Team"
            />
          )}
        </DialogHeader>
        <div className="space-y-2">
          <div>
            <label className="block text-sm font-medium mb-1">QR Code</label>
            <Input
              type="text"
              value={qrCode}
              readOnly
              placeholder="Click 'Generate QR Code' to create a code"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Menu URL</label>
            <Input
              type="text"
              value={menuURL}
              placeholder="Click 'Generate QR Code' to create a code"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={handleGenerateQRCode}
            className="flex items-center gap-2"
            disabled={QRMutation.isPending}
          >
            <QrCode className="h-4 w-4" />
            {QRMutation.isPending ? "Generating..." : "Generate QR Code"}
          </Button>
          <Button
            variant="default"
            onClick={handleCopyQRCode}
            className="flex items-center gap-2"
            disabled={!qrCode}
          >
            <CopyIcon className="h-4 w-4" />
            {isCopied ? "Copied!" : "Copy Menu URL"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default QRCodeDialog;
