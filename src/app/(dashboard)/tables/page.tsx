"use client";

import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AlertDestructive from "@/components/alerts/AlertDestructive";
import AlertWarning from "@/components/alerts/AlertWarning";
import { Button } from "@/components/ui/button";
import AddTableDialog from "@/components/dialogs/AddTableDialog";
import { createTable, getTables } from "./actions";
import TableCard from "@/components/cards/TableCard";
import OrderSkeletons from "@/components/skeletons/OrderSkeletons";
import { useToast } from "@/hooks/use-toast";

export interface TableDataState {
  tableNumber: string;
  location: string;
  capacity: number;
}
const Page = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newTableData, setNewTableData] = useState<TableDataState>({
    tableNumber: "",
    location: "",
    capacity: 0,
  });
  const {
    data: tables,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["tables"],
    queryFn: async () => {
      const data = await getTables();

      if (!!data && data.length > 0) {
        setNewTableData({
          ...newTableData,
          tableNumber: String(data[data.length - 1].table_number + 1),
        });
      }
      return data;
    },
  });
  const createTableMutation = useMutation({
    mutationFn: async (data: TableDataState) =>
      await createTable({
        capacity: data.capacity,
        location: data.location,
        status: "",
        table_number: Number(data.tableNumber),
      }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tables"] }),
    onError(error) {
      toast({
        title: "Table already exist.",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleConfirmCreateTable = () => {
    setIsDialogOpen(false);
    createTableMutation.mutate(newTableData);
  };

  if (isLoading) return <OrderSkeletons />;
  if (!!error?.message)
    return (
      <AlertDestructive
        className="w-max"
        title={error.message}
        description="Please attempt to refresh the page. If the issue continues, contact the IT team."
      />
    );
  if (!tables)
    return (
      <AlertDestructive
        className="w-max"
        title={"Invalid tables"}
        description="Please attempt to refresh the page. If the issue continues, contact the IT team."
      />
    );
  if (!!tables && tables.length === 0)
    return (
      <AlertWarning
        className="w-max"
        title="No tables have been created yet."
        description="Click the button below to add a new table."
      />
    );

  return (
    <div className="h-full flex flex-col gap-4 p-4">
      <div className="flex justify-end">
        <Button
          disabled={createTableMutation.isPending}
          onClick={() => setIsDialogOpen(true)}
        >
          {createTableMutation.isPending ? "Creating..." : "Create New Table"}
        </Button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 flex-1">
        {tables.map((table) => (
          <TableCard key={table.id} table={table} />
        ))}
      </div>
      <AddTableDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={handleConfirmCreateTable}
        newTableData={newTableData}
        setNewTableData={setNewTableData}
      />
    </div>
  );
};

export default Page;
