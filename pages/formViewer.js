import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/faculty.module.css'
import Router from 'next/router'
/*Reports Viewer
will load report information
*/
let Approve = "Approve"
let Deny = "Deny"

export default function Home() {


      // Handles the submit event on form submit.
      const handleSubmit = async (event) => {
        // Stop the form from submitting and refreshing the page.
        event.preventDefault()

        Router.push("/faculty_homepage");

        // Get data from the form.
        const data = {
            approval: event.target.submit.value
        }

        // Send the data to the server in JSON format.
        const JSONdata = JSON.stringify(data)

        // API endpoint where we send form data.
        const endpoint = '/api/facultyapproval_form'

        // Form the request for sending data to the server.
        const options = {
            // The method is POST because we are sending data.
            method: 'POST',
            // Tell the server we're sending JSON.
            headers: {
                'Content-Type': 'application/json',
            },

            // Body of the request is the JSON data we created above.
            body: JSONdata,
        }

        // Send the form data to our forms API and get a response.
        const response = await fetch(endpoint, options)

        // Get the response data from server as JSON.
        // If server returns the data submitted, that means the form works.
        const result = await response.json()

        if (response.status == 200) {
            alert(result.message)
            Router.push("/facultyapproval_form")
        }
        else if (response.status == 400) {
            alert(result.message)
        }
    }

    return (

  


<div className={styles.container}>
      <Head>
        <title>Submitted Form</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>

<h1 className={styles.title}>
Student Form 
</h1>
        <p><b>Student Name: </b> &nbsp; &nbsp; Sophia Abuzeni</p>
         
          <br></br>
          <p><b>Event:</b> &nbsp; &nbsp; UNF Leaders Convention </p>
          <br></br>
            <p><b>Hours Amount: </b> &nbsp; &nbsp; 12 </p>
            <br></br>
            <p><b>Professor: </b> &nbsp; &nbsp; Karthikeyen Umapathy </p>
            <br></br>
           <p><b>Notes: </b> &nbsp; &nbsp; I was at the event for 12 hours and helped with informing new students.  </p>
        


<form className={styles.description} onSubmit={handleSubmit} method="post">
          <input type="radio" id="appr" name="submit" value="approve"/>
          <label htmlFor="appr">Approve</label>
          <br></br>
          <input type="radio" id="denied" name="submit" value="deny"/>
          <label htmlFor="denied">Deny</label> 
          <br></br>
          
        <input type="submit" value="Submit" />
        </form>
</main>
</div>
    )
}

