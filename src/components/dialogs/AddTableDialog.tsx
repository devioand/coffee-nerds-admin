import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TableDataState } from "@/app/(dashboard)/tables/page";

interface AddTableDialogProps {
  title?: string;
  description?: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  newTableData: TableDataState;
  setNewTableData: React.Dispatch<React.SetStateAction<TableDataState>>;
}

const AddTableDialog: React.FC<AddTableDialogProps> = ({
  title,
  description,
  isOpen,
  onClose,
  onConfirm,
  newTableData,
  setNewTableData,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title || "Create New Table"}</DialogTitle>
          <DialogDescription>
            {description || "Fill in the details below to create a new table."}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="block font-medium mb-1">
              Table Number (auto generated in sequence){" "}
            </label>
            <Input
              // disabled
              type="text"
              placeholder="Table Number"
              value={newTableData.tableNumber}
              onChange={(e) =>
                setNewTableData({
                  ...newTableData,
                  tableNumber: e.target.value,
                })
              }
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Location</label>
            <Input
              type="text"
              placeholder="Location"
              value={newTableData.location}
              onChange={(e) =>
                setNewTableData({ ...newTableData, location: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Capacity</label>
            <Input
              type="number"
              placeholder="Capacity"
              value={newTableData.capacity}
              onChange={(e) =>
                setNewTableData({
                  ...newTableData,
                  capacity: Number(e.target.value),
                })
              }
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onConfirm}>Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddTableDialog;
