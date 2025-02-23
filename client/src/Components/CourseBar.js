import React, { useContext } from 'react';
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { ListGroup } from "react-bootstrap";

const CourseBar = observer(() => {
    const { courses } = useContext(Context);

    return (
        <ListGroup>
            {courses.courses.map(course => (
                <ListGroup.Item key={course.CourseID}>
                    {course.CourseName}
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
});

export default CourseBar;