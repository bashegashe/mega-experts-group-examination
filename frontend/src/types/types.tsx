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

export interface MeetupFullDetail {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
  host: string;
  location: string;
  rating: number;
}

export interface LoaderProps {
  className?: string;
}

export interface SearchProps {
  query: string;
  setQuery: (query: string) => void;
}
