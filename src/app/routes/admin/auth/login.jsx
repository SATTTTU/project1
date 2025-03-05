export const AdminLoginRoute = () => {
  return (
    <div className="login-container">
      <h1>Admin Login</h1>
      <form>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
