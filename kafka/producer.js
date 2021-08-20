const { Kafka } = require('kafkajs')
 
const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:29092', 'localhost:39092']
})
 
const producer = kafka.producer()

 
const run = async () => {
  // Producing
  await producer.connect()

	let i = 0 ;
	setInterval( async() => {
		  await producer.send({
		    topic: 'CUSTOMER',
		    messages: [
		      { value: 'Hello KafkaJS user! ' + i },
		    ],
		  })


	i++;
}, 1000)


}
 
run().catch(console.error)
