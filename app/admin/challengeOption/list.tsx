import {
  BooleanField,
  Datagrid,
  List,
  ReferenceField,
  TextField,
} from "react-admin";

export const ChallengeOptionList = () => {
  return (
    <List>
      <Datagrid rowClick="edit">
        <TextField source="id" />
        <TextField source="text" />
        <BooleanField source="correct"/>
        <ReferenceField source="challengeId" reference="challenges">
          <TextField source="question"/>
        </ReferenceField>
        <TextField source="challengeId" />
        <TextField source="imageSrc" />
      </Datagrid>
    </List>
  );
};
