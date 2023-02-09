import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import ReactTooltip from 'react-tooltip';
import Router from 'next/router'
import styles from '../styles/Student.module.css'
import unfLogo from '../public/UNF_Logo.gif';
import { server, withSessionSsr } from './lib/config/withSession';

export const getServerSideProps = withSessionSsr(
    async ({req, res}) => {
        const user = req.session.user;

        if(!user) {
            return {
                notFound: true,
            }
        }

        const response = await fetch(server + '/api/student_form_build', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        });
    
        const faculty_list_object = await response.json();
        const faculty_list = faculty_list_object.faculty_list;

        return {
            props: { user, faculty_list }
        }
    }
);

const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch('/api/student_form_submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: event.target.username.value,
            event: event.target.event.value,
            date: event.target.date.value,
            hours: event.target.hours.value,
            faculty_id: event.target.faculty_id.value,
            comment: event.target.comment.value
        }),
    });

    const result = await response.json();

    if (response.status == 200) {
        Router.push("/student_submitted_forms");
    }
    else {
        alert(result.message);
    }
};

const StudentForm = ({ user, faculty_list }) => (
    <div>
        <Head>
            <title>Submit Hours</title>
            <meta name="description" content="Submit Hours" />
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <header className={styles.header}>
            <Link href="/student_home"><Image className={styles.image} src={unfLogo} alt="UNF"/></Link>
        </header>

        <div className={styles.breadcrumb}>
            <Link href="/student_home">Home</Link>
        </div>

        <h1 className={styles.description}>
                Submit Hours to Instructor
        </h1>

        <main>
            <form onSubmit={handleSubmit} className={styles.description} method='post'>
    
                <input name="username" type='hidden' className={styles.input} value={user.username} readOnly/>
                <input name='event' type="text" maxLength="255" placeholder="Event" className={styles.input} data-tip="The name of the event you attended." required/><ReactTooltip place="bottom"/>
                <br></br>
                <input name="hours" type="number" placeholder="Hours" className={styles.input} data-tip="The number of hours you attended the event. (No fractional hours will be accepted.)" required/><ReactTooltip place="bottom"/>
                <br></br>
                <input name="date" type="date" className={styles.input} data-tip="The date you attended the event." required/><ReactTooltip place="bottom"/>
                <br></br>

                {faculty_list.map((faculty) => (
                    <select name="faculty_id" key={faculty.account_id} className={styles.input}>
                        <option value={faculty.account_id}>{faculty.first_name} {faculty.last_name}</option>
                    </select>
                ))}
                <br></br>

                <textarea name="comment" maxLength="255" className={styles.input} placeholder="Additional comments for your instructor?" cols="50"></textarea>
                <br></br>
                <input type="submit" value="Submit"/>
            </form>
        </main>
    </div>
);

export default StudentForm;
