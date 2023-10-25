export interface FormData {
  username: string;
  password: string;
}

export interface AuthFormProps {
  onSubmit: (data: FormData) => void;
  initialValues: FormData;
}

export interface Meetup {
  id: string;
  title: string;
  description: string;
}
