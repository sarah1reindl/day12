async function check_route(url) {
    try {
        let response = await fetch(url);
        if (response.ok) {
            console.log("All is good");
        } else {
            console.log("Shit happens");  
        }
    } catch (error) {
        console.log("Shit happens");
    }
}
check_route('https://docs.cdp.coinbase.com/coinbase-app/docs/welcome#data-endpoints');  
check_route('https://dog.ceo/dog-api/');
check_route('https://imgflip.com/api');      
check_route('https://sv443.net/jokeapi/v2/');
