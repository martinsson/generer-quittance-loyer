# Automate export and email of a google doc template

## Quittance de loyer
Generate a french "quittance de loyer" for the current month

You'll need a service account credential from google. Please store this file locally 
and specify it with the environment variable like this 

    GOOGLE_APPLICATION_CREDENTIALS=credentials.json
    
* first create a document that is accessible with the service account (normal user documents are not)
    by running. The created document id will be printed to the console. You'll need that later 
    
    
```    
    node run_createdoc.js <your google email address> 
```    
    
* Go to your drive and edit the document as you want it. 
    You can use my  [sample document](https://docs.google.com/document/d/1zH5VHvwcKEs3vFn4nCBJGUM9z2ppsjBKIXALNkN69hE/edit?usp=sharing). 
     
* Create your configuration by copying the sample configuration : configuration-sample.json
    replace the values as you see fit. If you have more than one quittance to generate you can
    make two or more configuration files.
      
* Launch the export
 
 
 ```
    GOOGLE_APPLICATION_CREDENTIALS=credentials.json node src/run_quittance.js configuration.json    
 ```   

