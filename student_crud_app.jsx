import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

let studentIdCounter = 1;

const initialStudent = {
  id: '',
  name: '',
  email: '',
  mobile: '',
  gender: 'Male',
  dob: '',
  address: '',
};

export default function StudentDashboard() {
  const [students, setStudents] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formMode, setFormMode] = useState('create'); // 'create' or 'edit'
  const [currentStudent, setCurrentStudent] = useState(initialStudent);
  const [editIndex, setEditIndex] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentStudent({ ...currentStudent, [name]: value });
  };

  const handleGenderChange = (value) => {
    setCurrentStudent({ ...currentStudent, gender: value });
  };

  const openCreateDialog = () => {
    setCurrentStudent({ ...initialStudent, id: `STU-${studentIdCounter++}` });
    setFormMode('create');
    setDialogOpen(true);
  };

  const openEditDialog = (student, index) => {
    setCurrentStudent(student);
    setEditIndex(index);
    setFormMode('edit');
    setDialogOpen(true);
  };

  const saveStudent = () => {
    if (formMode === 'create') {
      setStudents([...students, currentStudent]);
    } else {
      const updated = [...students];
      updated[editIndex] = currentStudent;
      setStudents(updated);
    }
    setDialogOpen(false);
  };

  const deleteStudent = (index) => {
    const updated = [...students];
    updated.splice(index, 1);
    setStudents(updated);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Student Dashboard</h1>
        <Button onClick={openCreateDialog}>Create New</Button>
      </div>

      <div className="grid gap-4">
        {students.map((student, index) => (
          <Card key={student.id} className="p-4 flex justify-between items-center">
            <div>
              <div><strong>{student.name}</strong> ({student.id})</div>
              <div>{student.email} | {student.mobile}</div>
              <div>{student.gender} | {student.dob}</div>
              <div>{student.address}</div>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => openEditDialog(student, index)}>Edit</Button>
              <Button variant="destructive" onClick={() => deleteStudent(index)}>Delete</Button>
            </div>
          </Card>
        ))}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>{formMode === 'create' ? 'Create Student' : 'Edit Student'}</DialogHeader>
          <div className="grid gap-2 mt-2">
            <Input name="id" value={currentStudent.id} disabled placeholder="Student ID" />
            <Input name="name" value={currentStudent.name} onChange={handleInputChange} placeholder="Name" autoFocus />
            <Input name="email" value={currentStudent.email} onChange={handleInputChange} placeholder="Email" />
            <Input name="mobile" value={currentStudent.mobile} onChange={handleInputChange} placeholder="Mobile Number" />
            <Select value={currentStudent.gender} onValueChange={handleGenderChange}>
              <SelectTrigger><SelectValue placeholder="Gender" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
            <Input type="date" name="dob" value={currentStudent.dob} onChange={handleInputChange} />
            <Input name="address" value={currentStudent.address} onChange={handleInputChange} placeholder="Address" />
            <Button onClick={saveStudent} className="mt-2">Save</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
