import { useState } from 'react';
import { useNavigate } from 'react-router';
import { postLogin } from '../api/examples.api';
import { CookieKeys, cookies } from '../utils/cookies';

export function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('Transon');
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  const onLogin = async () => {
    if (!username?.trim()) {
      alert('Please enter a username');
      return;
    }

    const response = await postLogin(username);
    const { data } = response;
    cookies.set(CookieKeys['ACCESS-TOKEN'], data.accessToken);
    cookies.set(CookieKeys['REFRESH-TOKEN'], data.refreshToken);

    navigate('/app');
  };

  return (
    <div className="m-4 p-4 border border-orange-400 rounded-2xl flex gap-4 items-center">
      <span className="shrink-0">{'User Name : '}</span>
      <input
        value={username}
        onChange={handleInputChange}
        className="border rounded-2xl px-4 py-2 focus:outline-none ring-offset-2 focus:ring-2 ring-orange-500"
      />
      <button
        onClick={onLogin}
        className="border rounded-2xl px-4 py-2 hover:cursor-pointer hover:border-orange-500 hover:text-orange-500"
      >
        {'Login'}
      </button>
    </div>
  );
}
