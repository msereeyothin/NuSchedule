import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import React from "react";
import { Button } from "@mui/material";
import { CourseNode } from "../../common/types";
import { useSearchCourses } from "../../hooks/useSearchCourses";
import CourseView from "../Course/CourseView";
import { alreadyExists } from "../../common/utils";

interface AddCourseModalProps {
  termId: string;
  courseList: CourseNode[];
  handleAdd: (course: CourseNode) => void;
  handleRemove: (course: CourseNode) => void;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  maxHeight: "80vh",
  overflow: "auto",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const AddCourseModal: React.FC<AddCourseModalProps> = ({
  termId,
  courseList,
  handleAdd,
  handleRemove,
}) => {
  const [curCoursesList, setcurCoursesList] = React.useState(courseList);
  const [searchQuery, setSearchQuery] = React.useState(""); // implement
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { courses, error, isLoading } = useSearchCourses("cs2", "202430"); //placeholder query

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Trouble finding classes!</div>;
  }

  return (
    <div>
      <Button onClick={handleOpen} variant="contained">
        Add Course
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          {courses &&
            courses.map((course: CourseNode) => (
              <CourseView
                courseNode={course}
                alreadyExists={alreadyExists(course, curCoursesList)}
                handleAdd={handleAdd}
                handleRemove={handleRemove}
              ></CourseView>
            ))}
        </Box>
      </Modal>
    </div>
  );
};

export default AddCourseModal;
