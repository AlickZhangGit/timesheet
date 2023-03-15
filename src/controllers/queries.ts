export const queries = {
    test: 'SELECT * FROM users WHERE id = ?;',
    userExists: 'Select COUNT(1) as count FROM users WHERE email = ?;',
    addUser: 'INSERT INTO timesheet.users (email,password) VALUES (?, ?);',
    getUser: 'Select email, password FROM users WHERE email = ?'
}