import {
  SimpleForm,
  Edit,
  TextInput,
  required,
  ReferenceInput,
  BooleanInput,
} from "react-admin";

export const ChallengeOptionEdit = () => {
  return (
    <Edit>
     <SimpleForm>
           <TextInput source="text" label="Text" validate={[required()]} />
           <BooleanInput source="correct" label="Correct Option" />
           <ReferenceInput source="challengeId" reference="challenges" />
           <TextInput source="imageSrc" label="Image URL" />
      </SimpleForm>
    </Edit>
  );
};
