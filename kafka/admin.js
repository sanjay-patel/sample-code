const { Kafka } = require('kafkajs')

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:29092','localhost:39092']
})

const run = async () => {
    console.log('run is called...');
    const admin = kafka.admin();

    await admin.connect();
    console.log('admin connect...');
    await admin.listTopics();
    console.log('after list topics...');

    const iTopicConfig = {
        topic: 'CUSTOMER',
        numPartitions: 4,     // default: 1
        replicationFactor: 2 // default: 1
    }

    await admin.createTopics({
        validateOnly: false,
        waitForLeaders: true,
        timeout: 5000,
        topics: [iTopicConfig]
    }).catch((e) => {
        console.error('exception caught in create topics')
        console.log(e);
    })

    const list = await admin.listTopics();
    console.log(list);

    await admin.disconnect();
}

run().catch(console.error)


