# Automate export and email of a google doc template

## Launch the export
If you've already done all the below, you can just:
 ```
   export GOOGLE_APPLICATION_CREDENTIALS=credentials.json 
   node src/run_quittance.js configuration.json
 ```   

You can also create one for past months. Ex for last month:

    node run_quittance.js configuration.json 2    


## Google Credentials
Generate a french "quittance de loyer" for the current month

You'll need a service account credential from google. You can create this in [IAM->ServiceAccounts](https://console.cloud.google.com/iam-admin/serviceaccounts).
Please store this file locally and specify it with the environment variable like this 

    export GOOGLE_APPLICATION_CREDENTIALS=credentials.json

## Share your doc with the service account    
A service account won't have access to documents of your own by default.

Either share an existing document with your service account.

Or you create a doc with the service account to make it accessible with it by running the following command.
The created document id will be printed to the console. You'll need that later  
    
```    
    node run_createdoc.js <your google email address> 
```    

## Edit the document    
* Go to your drive and edit the document as you want it. 
    You can use my  [sample document](https://docs.google.com/document/d/1zH5VHvwcKEs3vFn4nCBJGUM9z2ppsjBKIXALNkN69hE/edit?usp=sharing). 

# Details of the person renting
* Create your configuration by copying the sample configuration : configuration-sample.json
    replace the values as you see fit. If you have more than one quittance to generate you can
    make two or more configuration files.
      
    

