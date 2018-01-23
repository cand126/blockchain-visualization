class Hash {
  static generateId() {
    return Math.floor((1 + Math.random()) * 0x100000000).toString(16).substring(1);
  }

  static generateNull() {
    return '00000000';
  }
}

export default Hash;
