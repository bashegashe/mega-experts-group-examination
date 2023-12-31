import './AuthForm.css';
import React, { useState, useRef, useEffect } from 'react';

import { AuthFormProps } from '../../types/types';

function AuthForm({ onSubmit, initialValues }: AuthFormProps) {
  const [data, setData] = useState(initialValues);
  const inputElem = useRef<HTMLInputElement | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(data);
  };

  useEffect(function () {
    if (inputElem.current) {
      inputElem.current.focus();
    }
  }, []);

  return (
    <form className='auth__form' onSubmit={handleSubmit}>
      <input
        className='input__large'
        type='text'
        name='username'
        placeholder='Användarnamn'
        autoComplete='current-username'
        value={data.username}
        onChange={handleChange}
        ref={inputElem}
      />
      <input
        className='input__large'
        type='password'
        name='password'
        placeholder='Lösenord'
        autoComplete='current-password'
        value={data.password}
        onChange={handleChange}
      />
      <button className='button__large button__large--effect' type='submit'>
        Skicka
      </button>
    </form>
  );
}

export default AuthForm;
