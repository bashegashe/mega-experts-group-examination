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
  attendees?: [];
  capacity?: number;
  reviews?: BackendReview[];
}

export interface LoaderProps {
  className?: string;
}

export interface SearchProps {
  query: string;
  setQuery: (query: string) => void;
}

export interface Review {
  rating: number;
  review?: string;
}

export interface BackendReview extends Review {
  userId: string;
  author: string;
}

export interface FilterProps {
  meetups: MeetupFullDetail[];
  handleFilterChange: (event: React.MouseEvent<HTMLButtonElement>, data: string) => void;
  data: string;
  filters: { [key: string]: string }[];
}

export interface FilterButtonProps {
  data: string;
  className: string;
  handleFilterChange: (event: React.MouseEvent<HTMLButtonElement>, data: string) => void;
  target: string;
  filters: { [key: string]: string }[];
}

export type SortByDateFormProps = {
  onSubmit: (event: React.FormEvent<HTMLFormElement>, dateRange: { start: string; end: string }) => void;
  resetState: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

export interface StarRatingProps {
  maxRating?: number;
  color?: string;
  size?: number;
  defaultRating?: number;
  messages?: string[];
  onChange?: (rating: number) => void; // Typ för onChange
  viewOnly?: boolean;
}

export interface StarItemProps {
  onRate: () => void;
  full: boolean;
  onHoverIn: () => void;
  onHoverOut: () => void;
  size: number;
  color: string;
}
