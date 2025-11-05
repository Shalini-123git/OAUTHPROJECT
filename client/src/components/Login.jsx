
const SERVER_URL = 'http://localhost:3000'

export default function Login() {
  return (
    <div className="login-buttons">
      <a href={`${SERVER_URL}/auth/google`}><button>Login with Google</button></a>
      <a href={`${SERVER_URL}/auth/facebook`}><button>Login with Facebook</button></a>
      <a href={`${SERVER_URL}/auth/github`}><button>Login with GitHub</button></a>
    </div>
  )
}
