const JPush = require('./JPush.js')

const clients = {}

const newClient(type, config) => {
  if (type === 'JPush') {
		return JPush(config)
	}
	throw new Error(`${type} is not supported`)
}

const newPushNotifications = (settings) => {
  return {
		push: (type) => {
			// if already created
			if (clients[type]) {
				return clients[type]
			}

			const config = settings[type]
			if (!config || Object.keys(config).length == 0) {
				throw new Error(`${type} setting not found!`)
			}

			clients[type] = newClient(type)
			return clients[type]
		}
	}
}

module.exports = newPushNotifications