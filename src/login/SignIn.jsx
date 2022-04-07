function SignIn({setShowSignIn}) {
    return ( 
        <div>sign up
              <p>Already a member <span className="pointer" onClick={() => setShowSignIn(true)}>signUp</span></p>
        </div>
     );
}

export default SignIn;