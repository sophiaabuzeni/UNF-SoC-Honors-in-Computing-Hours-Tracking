import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/faculty.module.css'
import unfLogo from '../public/UNF_Logo.gif'
import {useEffect, useState} from "react";
/*Reports Page
Shows unresolved reports


*/
export default function Home() {
<div className={styles.container}>
<div className={styles.link}> 
<h3><a href="/faculty_homepage">Homepage &nbsp; &nbsp; </a></h3>
</div>
</div>

  const [dataResponse, setdataResponse] = useState([]);

useEffect(() => {
  async function getPageData() {
    const apiURLEndpoint = '/api/faculty_queue';
    const response = await fetch(apiURLEndpoint);
    const res = await response.json();
    console.log(res);
  setdataResponse(res.entries);

  }

getPageData();
}, []);

  return (
<div className={styles.container}>
<Head>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
</Head>
    
      <Image className={styles.logo} src={unfLogo} alt="UNF"/>

<div className={styles.link}> 
<a href="/faculty_homepage">Homepage </a>
</div>
      <Head>
        <title>Submitted Form Queue</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
<main className={styles.main}>
<h1 className={styles.title}>
Submitted Form Queue
</h1>
<input type="text" id="input"  placeholder="Search for Submitted Forms" title="searchInput" className="search-input" data-table="reports-list"></input>
<br></br>
<table className={styles.table} id="tableID">
    <thead className={styles.head}>
  <tr>
  <th className={styles.thead}>Entry ID</th>
  <th className={styles.thead}>Student ID</th>
  <th className={styles.thead}>Faculty ID</th>
    <th className={styles.thead}>Event Name</th>
    <th className={styles.thead}>Event Date</th>
    <th className={styles.thead}>Time Accrued</th>
    <th className={styles.thead}>Latest Comment</th>
    <th className={styles.thead}>Comment ID</th>
    <th className={styles.thead}>Entry Status</th>
    <th className={styles.thead}><a href="formViewer"> View Form </a> </th>
  </tr>
  </thead>
  </table>

  {dataResponse.map((entries) => {
  return (
<div key={entries.entry_id}>
  <tbody>
<tr className={styles.trow}>
<td className={styles.tbody}>{entries.entry_id}</td>
<td className={styles.tbody}>{entries.student_id}</td>
<td className={styles.tbody}>{entries.faculty_id}</td>
<td className={styles.tbody}>{entries.event_date}</td>
<td className={styles.tbody}>{entries.time_accrued}</td>
<td className={styles.tbody}>{entries.latest_comment}</td>
<td className={styles.tbody}>{entries.latest_commentor_id}</td>
<td className={styles.tbody}>{entries.entry_status}</td>
<td className={styles.tbody}>{ } </td>
</tr>
</tbody>
</div>
  );
})}

</main>
</div>
    )
  }
    
  
