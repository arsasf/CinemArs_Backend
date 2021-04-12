const mysql = require('mysql2')

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'cinemars_ticket_booking'
})

connection.connect((error) => {
  if (error) throw error
  console.log("You're now conneted")
})

module.exports = connection
