const {mail} = require('../config')

send = Promise.promisify(require('gmail-send')(mail));

sendContact = ({mail, name, phone, city, company, text}) => {
	message = {
		from: mail,
		subject: `Consulta de ${name}`,
		html: `
		<h2>Datos del contacto</h2>
		<p>Nombre: ${name}</p>
		<p>Mail: ${mail}</p>
		<p>Teléfono: ${phone}</p>
		<p>Ciudad: ${city}</p>
		<p>Empresa: ${company}</p>

		<h3>Mensaje:</h3>
		<p>${text}</p>
		`
	}
  return send(message)
}

module.exports.send = send
module.exports.sendContact = sendContact
