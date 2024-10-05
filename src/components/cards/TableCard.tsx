"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatDistanceToNowStrict } from "date-fns";
import { Table } from "@/types/table.types";
import { isTableLocked } from "@/utils/table.utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  deleteTable,
  unlockTable,
  updateTable,
} from "@/app/(dashboard)/tables/actions";
import { TableDataState } from "@/app/(dashboard)/tables/page";
import AddTableDialog from "../dialogs/AddTableDialog";
import useDisclosure from "@/hooks/useDisclosure";
import ConfirmationDialog from "../dialogs/ConfirmationDialog";
import { useToast } from "@/hooks/use-toast";
import { LockOpen, QrCodeIcon } from "lucide-react";
import QRCodeDialog from "../dialogs/QRCodeDialog";

interface TableCardProps {
  table: Table;
}

const TableCard: React.FC<TableCardProps> = ({ table }) => {
  const { toast } = useToast();
  const [newTableData, setNewTableData] = useState<TableDataState>({
    tableNumber: String(table.table_number),
    location: table.location,
    capacity: table.capacity,
  });
  const editDisclosure = useDisclosure();
  const deleteDisclosure = useDisclosure();
  const unlockDisclosure = useDisclosure();
  const QRDisclosure = useDisclosure();
  const isLocked = isTableLocked(table.locked_until);
  const queryClient = useQueryClient();
  const unlockOrderMutation = useMutation({
    onMutate: unlockDisclosure.onClose,
    mutationFn: () => unlockTable(table.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tables"] });
    },
  });
  const updateTableMutation = useMutation({
    onMutate: editDisclosure.onClose,
    mutationFn: async () => {
      await updateTable(table.id, {
        capacity: newTableData.capacity,
        location: newTableData.location,
      });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tables"] }),
  });
  const deleteTableMutation = useMutation({
    onMutate: deleteDisclosure.onClose,
    mutationFn: () => deleteTable(table.id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tables"] }),
    onError(error) {
      toast({
        title: "Failed to delete table.",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return (
    <>
      <Card className="shadow-md relative">
        <CardHeader>
          <CardTitle className="text-[22px]">
            Table #{table.table_number}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p>
            <strong>Location:</strong> {table.location}
          </p>
          <p>
            <strong>Capacity:</strong> {table.capacity}
          </p>
          <p>
            <strong>Is Locked:</strong>{" "}
            <TableLockTimer lockedUntil={table.locked_until} />
          </p>
        </CardContent>
        <CardFooter className="flex flex-wrap gap-2 mt-4 pb-0">
          <Button
            disabled={updateTableMutation.isPending}
            variant="outline"
            onClick={editDisclosure.onOpen}
          >
            {updateTableMutation.isPending ? "Updating..." : "Edit"}
          </Button>
          <Button
            disabled={deleteTableMutation.isPending}
            variant="destructive"
            onClick={deleteDisclosure.onOpen}
          >
            {deleteTableMutation.isPending ? "Deleting..." : "Delete"}
          </Button>
          <Button variant="default" onClick={QRDisclosure.onOpen}>
            <QrCodeIcon className="h-4 w-4 mr-1" />
            QR Code
          </Button>
        </CardFooter>
        <div className="absolute top-6 right-6">
          {isLocked && (
            <Button
              variant="outline"
              // onClick={() => unlockOrderMutation.mutate()}
              onClick={unlockDisclosure.onOpen}
              disabled={unlockOrderMutation.isPending}
            >
              <div className="flex gap-2">
                <LockOpen size={20} />
                {unlockOrderMutation.isPending ? "Unlocking..." : "Unlock"}
              </div>
            </Button>
          )}
        </div>
      </Card>

      {/* Table edit modal */}
      <AddTableDialog
        title={`Edit Table#${table.table_number}`}
        description="Fill in the details below to create a new table."
        isOpen={editDisclosure.isOpen}
        onClose={editDisclosure.onClose}
        onConfirm={() => updateTableMutation.mutate()}
        newTableData={newTableData}
        setNewTableData={setNewTableData}
      />

      {/* Confirmation modal on order deletion */}
      <ConfirmationDialog
        isOpen={deleteDisclosure.isOpen}
        onClose={deleteDisclosure.onClose}
        onConfirm={() => deleteTableMutation.mutate()}
        title="Confirm Deletion"
        description="Are you sure you want to delete this order? This action cannot be undone."
      />

      {/* Confirmation modal on table unlock */}
      <ConfirmationDialog
        isOpen={unlockDisclosure.isOpen}
        onClose={unlockDisclosure.onClose}
        onConfirm={() => unlockOrderMutation.mutate()}
        title={`Confirm Unlock Table ${table.table_number}?`}
        description="Are you sure you want to unlock this table? It'll let customers order again from the same table."
        confirmButtonLabel="Unlock"
      />

      {/* QR modal to generate QR Code */}
      <QRCodeDialog
        defultValue={{
          tableId: table.id,
          qrCode: table.qr_code,
          table_no: table.table_number.toString(),
        }}
        isOpen={QRDisclosure.isOpen}
        onClose={QRDisclosure.onClose}
      />
    </>
  );
};

interface TableLockTimerProps {
  lockedUntil: string | null;
}

const TableLockTimer: React.FC<TableLockTimerProps> = ({ lockedUntil }) => {
  const [timeRemaining, setTimeRemaining] = useState<string | null>(null);

  useEffect(() => {
    if (!lockedUntil) {
      setTimeRemaining(null);
      return;
    }

    const lockedDate = new Date(lockedUntil);

    if (lockedDate <= new Date()) {
      setTimeRemaining(null);
    } else {
      const updateRemainingTime = () => {
        const remaining =
          lockedDate <= new Date()
            ? null
            : formatDistanceToNowStrict(lockedDate, { addSuffix: true });
        setTimeRemaining(remaining);
      };

      updateRemainingTime();
      const interval = setInterval(updateRemainingTime, 1000);

      return () => clearInterval(interval);
    }
  }, [lockedUntil]);

  if (!timeRemaining) {
    return <span>Not locked</span>;
  }

  return <span>Unlock {timeRemaining}</span>;
};

export default TableCard;
