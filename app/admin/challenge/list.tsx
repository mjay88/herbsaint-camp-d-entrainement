import {
  Datagrid,
  List,
  NumberField,
  ReferenceField,
  TextField,
} from "react-admin";

export const ChallengeList = () => {
  return (
    <List>
      <Datagrid rowClick="edit">
        <TextField source="id" />
        <NumberField source="lessonId" title="lessonId" />
        <ReferenceField source="lessonId" reference="lessons" />
        <TextField source="type" />
        <TextField source="question" />
        <NumberField source="order" />
      </Datagrid>
    </List>
  );
};
