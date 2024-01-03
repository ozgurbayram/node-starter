class AuthService {
  /**
   * getTokenViaPasswordGrant
   */
  public async getTokenViaPasswordGrant() {
    return Promise.resolve({
      username: "ozgur",
      token: "hello world",
    });
  }
}

export default AuthService;
