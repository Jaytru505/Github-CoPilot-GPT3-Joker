const functions = require("firebase-functions");
const {Configuration, OpenAIApi} = require("openai");
const cors = require("cors")({origin: true});

// CoPilot wrote most of this code; I just added the cors function to it.

exports.joker = functions.https.onRequest( (req, res) => {
  cors(req, res, () => {
    const configuration = new Configuration({
      // eslint-disable-next-line max-len
      apiKey: "_YOUR_API_KEY_", // You should save your API_KEY as an environment variable and use process.env.API_KEY > https://firebase.google.com/docs/functions/config-env
    });
    const openai = new OpenAIApi(configuration);

    const queryCompletionEndpoint = () => {
      // eslint-disable-next-line max-len
      const resp = openai.createCompletionFromModel({
        prompt: "Tell a joke like a George Carlin",
        temperature: 0.90,
        max_tokens: 50,
        top_p: 1,
        best_of: 5,
        frequency_penalty: 0,
        presence_penalty: 0.22,
        // eslint-disable-next-line max-len
        model: "davinci:ft-discourse-digital-2022-04-10-20-27-10", // This is a custom model trained on George Carlin jokes; you can train your own model using the OpenAI API
      });
      return resp;
    };

    console.info("Attempting query....");

    queryCompletionEndpoint().then(
        // handle response
        function(response) {
          res.status(200).send(response.data);
        }
    ).catch(
        function(error) {
          res.status(500).send(JSON.stringify(error));
        }
    );
  });
});
