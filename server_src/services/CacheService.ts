import { createClient } from 'redis';

const client = createClient({
    url: process.env.REDIS_URL
});

client.on('error', (err) => console.log('Redis Client Error', err));

class CacheService {

    connected = false
    async init(){
        if(!this.connected){
            try {
                await client.connect();
                this.connected = true
            } catch (error) {
                console.log("Error connecting to the redis client", error)
                this.connected = false
            }
        }
       
    }

    saveData = (data: any) => {
        return client.set('weather', JSON.stringify(data));
    }

    getDataFromCache = () => {
        return client.get('weather');
    }
}

export default new CacheService()