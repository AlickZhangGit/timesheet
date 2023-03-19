export const queries = {
    test: 'SELECT * FROM timesheet.users WHERE id = $1;',
    userExists: 'Select COUNT(1) as count FROM timesheet.users WHERE email = $1;',
    addUser: 'INSERT INTO timesheet.users (email,password) VALUES ($1, $2);',
    getUser: 'Select email, password FROM timesheet.users WHERE email = $1',
    getTimeByMonth: 'SELECT * FROM timesheet.times WHERE email = $1 AND year = $2 AND month = $3;',
}