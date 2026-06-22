// import React from 'react';
// import { Container, Table } from 'react-bootstrap';

// const Advertise = () => {
    
//     // इस पेज के लिए सारी कस्टम स्टाइलिंग
//     const styles = `
//         .advertise-container {
//             font-family: Arial, sans-serif;
//             text-align: center;
//             color: #333; /* Default text color */
//             padding-top: 2rem;
//             padding-bottom: 2rem;
//         }

//         /* --- Header Styles --- */
//         .ad-header-main {
//             font-size: 2.5rem;
//             font-weight: bold;
//             margin-bottom: 1rem;
//             letter-spacing: 1px;
//         }
//         .ad-header-sub {
//             font-size: 1.5rem;
//             font-weight: bold;
//             margin-bottom: 0.5rem;
//         }
//         .ad-header-contact {
//             font-size: 1.3rem;
//             font-weight: bold;
//             margin-bottom: 0.5rem;
//         }
//         .ad-header-email {
//             font-size: 1.2rem;
//             font-weight: bold;
//             margin-bottom: 3rem;
//         }

//         /* --- Rate Table Styles --- */
//         .rate-info {
//             margin-bottom: 1rem;
//         }
//         .rate-info-red {
//             color: #c00000; /* Red color from image */
//             font-weight: bold;
//         }
//         .rate-info-blue {
//             color: #0000ff; /* Blue color */
//             font-weight: bold;
//             margin-bottom: 1rem;
//         }
//         .rate-table {
//             border: 1px solid #ccc;
//             margin: 0 auto 3rem auto; /* Center the table */
//             max-width: 1000px;
//             font-size: 0.9rem;
//         }
//         .rate-table th, .rate-table td {
//             border: 1px solid #ccc;
//             vertical-align: middle;
//             text-align: center;
//             padding: 0.75rem 0.5rem;
//         }
//         .rate-table thead th {
//             background-color: #f8f9fa; /* Light grey header */
//             font-weight: bold;
//         }
//         .market-name {
//             color: #c00000;
//             font-weight: bold;
//         }
//         .total-row td {
//             font-weight: bold;
//         }
        
//         /* --- Market Coverage Styles --- */
//         .market-coverage-banner {
//             background-color: #c00000;
//             color: white;
//             padding: 0.75rem;
//             font-size: 1.5rem;
//             font-weight: bold;
//             max-width: 1000px;
//             margin: 0 auto;
//         }
//         .market-coverage-list {
//             padding: 1.5rem;
//             font-size: 1.1rem;
//             line-height: 1.8;
//             max-width: 1000px;
//             margin: 0 auto 3rem auto;
//             text-align: left;
//         }
//         .edition-name {
//             color: #0000ff;
//             font-weight: bold;
//         }

//         /* --- Digital Ad Sales Styles --- */
//         .digital-sales-contact {
//             font-size: 1.8rem;
//             font-weight: bold;
//         }
//         .digital-sales-email {
//             font-size: 1.5rem;
//             font-weight: bold;
//         }
//     `;
    
//     // टेबल का डेटा
//     const tableData = [
//         { market: 'Jabalpur', publication: 'Jabalpur Express (Hindi)', bw: 250, color: 300, backPage: 375, frontPage: 450, semiSolus: 400 },
//         { market: 'Chhindwara', publication: 'Jabalpur Express (Hindi)', bw: 250, color: 300, backPage: 375, frontPage: 450, semiSolus: 400 },
//         { market: 'Balaghat', publication: 'Jabalpur Express (Hindi)', bw: 250, color: 300, backPage: 375, frontPage: 450, semiSolus: 400 },
//         { market: 'Bhopal', publication: 'Express News (Hindi)', bw: 250, color: 300, backPage: 375, frontPage: 450, semiSolus: 400 },
//         { market: 'Bilaspur', publication: 'Express News (Hindi)', bw: 175, color: 250, backPage: 300, frontPage: 375, semiSolus: 350 },
//         { market: 'Gwalior', publication: 'Express News (Hindi)', bw: 175, color: 250, backPage: 300, frontPage: 375, semiSolus: 350 },
//         { market: 'Katni', publication: 'Express News (Hindi)', bw: 175, color: 250, backPage: 300, frontPage: 375, semiSolus: 350 },
//     ];
    
//     // टोटल की गणना
//     const totals = {
//         bw: tableData.reduce((sum, row) => sum + row.bw, 0),
//         color: tableData.reduce((sum, row) => sum + row.color, 0),
//         backPage: tableData.reduce((sum, row) => sum + row.backPage, 0),
//         frontPage: tableData.reduce((sum, row) => sum + row.frontPage, 0),
//         semiSolus: tableData.reduce((sum, row) => sum + row.semiSolus, 0),
//     };

//     return (
//         <>
//             <style>{styles}</style>
//             <Container className="advertise-container">

//                 {/* ======================= Header Section ======================= */}
//                 <h1 className="ad-header-main">ADVERTISE WITH US</h1>
//                 <h2 className="ad-header-sub">For Print Publication</h2>
//                 <h2 className="ad-header-sub">JABALPUR EXPRESS & EXPRESS NEWS</h2>
//                 <p className="ad-header-contact">CONTACT : 9229226434, 9425008620</p>
//                 <p className="ad-header-email">expressnews.advt@gmail.com</p>

//                 {/* ======================= Rate Table Section ======================= */}
//                 <div className="rate-info">
//                     <span className="rate-info-red">Commercial Rates w.e.f. 1st April 2022</span>
//                 </div>
//                 <div className="rate-info-blue">
//                     <span>Individual Editions Wise Rates:</span>
//                 </div>

//                 <Table bordered className="rate-table">
//                     <thead>
//                         <tr>
//                             <th>Market</th>
//                             <th>Publications</th>
//                             <th>B & W any page inside<br />(per sq.cm.)</th>
//                             <th>Color any page inside<br />(per sq.cm.)</th>
//                             <th>Back page page 3 color<br />(per sq.cm.)</th>
//                             <th>Front page Solus<br />(per sq.cm.)</th>
//                             <th>Front page Semi Solus<br />(per sq.cm.)</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {tableData.map((row, index) => (
//                             <tr key={index}>
//                                 <td className="market-name">{row.market}</td>
//                                 <td>{row.publication}</td>
//                                 <td>{row.bw}</td>
//                                 <td>{row.color}</td>
//                                 <td>{row.backPage}</td>
//                                 <td>{row.frontPage}</td>
//                                 <td>{row.semiSolus}</td>
//                             </tr>
//                         ))}
//                         <tr className="total-row">
//                             <td colSpan="2">Total</td>
//                             <td>{totals.bw}</td>
//                             <td>{totals.color}</td>
//                             <td>{totals.backPage}</td>
//                             <td>{totals.frontPage}</td>
//                             <td>{totals.semiSolus}</td>
//                         </tr>
//                     </tbody>
//                 </Table>

//                 {/* ======================= Market Coverage Section ======================= */}
//                 <div className="market-coverage-banner">
//                     MARKET COVERAGE JABALPUR EXPRESS & EXPRESS NEWS
//                 </div>
//                 <div className="market-coverage-list">
//                     <span className="edition-name">JABALPUR EDITION</span> - JABALPUR, SEONI, MANDLA, NARSINGPUR, DINDORI, KATNI, UMARIA, ANUPPUR, SHAHDOL <span className="edition-name">CHINDWARA EDITION</span> - CHINDWARA DISTRICT <span className="edition-name">BALAGHAT EDITION</span> - BALAGHAT DISTRICT <span className="edition-name">GWALIOR EDITION</span> - GWALIOR, BHIND, MURENA, SHIVPURI, ASHOK NAGAR, GUNA <span className="edition-name">KATNI EDITION</span> - KATNI, UMARIYA, SAHDOL, ANUPPUR, SATNA, REWA, SEEDHI, SINGROLI, DINDORI, DAMOH
//                 </div>

//                 {/* ======================= Digital Ad Sales Section ======================= */}
//                 <div className="digital-sales-section">
//                     <p className="digital-sales-contact">FOR DIGITAL AD SALES CONTACT 9229226532</p>
//                     <p className="digital-sales-email">Email : emsnews.india@gmail.com</p>
//                 </div>

//             </Container>
//         </>
//     );
// };

// export default Advertise;

import React from 'react';
import { Container, Table } from 'react-bootstrap';

const Advertise = () => {
    
    // इस पेज के लिए सारी कस्टम स्टाइलिंग
    const styles = `
        .advertise-container {
            font-family: Arial, sans-serif;
            text-align: center;
            color: #333;
            padding-top: 2rem;
            padding-bottom: 2rem;
        }

        /* --- Header Styles --- */
        .ad-header-main { font-size: 2.5rem; font-weight: bold; margin-bottom: 1rem; letter-spacing: 1px; }
        .ad-header-sub { font-size: 1.5rem; font-weight: bold; margin-bottom: 0.5rem; }
        .ad-header-contact { font-size: 1.3rem; font-weight: bold; margin-bottom: 0.5rem; }
        .ad-header-email { font-size: 1.2rem; font-weight: bold; margin-bottom: 3rem; }

        /* --- Rate Table Styles --- */
        .rate-info { margin-bottom: 1rem; }
        .rate-info-red { color: #c00000; font-weight: bold; }
        .rate-info-blue { color: #002060; font-weight: bold; margin-bottom: 1rem; }
        .rate-table {
            border: 1px solid #ccc;
            margin: 0 auto 3rem auto;
            max-width: 1000px;
            font-size: 0.9rem;
        }
        .rate-table th, .rate-table td {
            border: 1px solid #ccc;
            vertical-align: middle;
            text-align: center;
            padding: 0.75rem 0.5rem;
        }
        .rate-table thead th {
            font-weight: bold;
            color: #002060; 
        }

        /* .market-name क्लास को हटा दिया गया है क्योंकि अब हम inline style का उपयोग कर रहे हैं */

        .total-row td {
            font-weight: bold;
            color: #002060; 
        }
        
        /* --- Market Coverage Styles --- */
        .market-coverage-banner {
            background-color: #c00000;
            color: white;
            padding: 0.75rem;
            font-size: 1.5rem;
            font-weight: bold;
            max-width: 1000px;
            margin: 0 auto;
        }
        .market-coverage-list {
            padding: 1.5rem;
            font-size: 1.1rem;
            line-height: 1.8;
            max-width: 1000px;
            margin: 0 auto 3rem auto;
            text-align: left;
        }
        .edition-name { color: #0000ff; font-weight: bold; }

        /* --- Digital Ad Sales Styles --- */
        .digital-sales-contact { font-size: 1.8rem; font-weight: bold; }
        .digital-sales-email { font-size: 1.5rem; font-weight: bold; }
    `;
    
    // टेबल का डेटा
    const tableData = [
        { market: 'Jabalpur', publication: 'Jabalpur Express (Hindi)', bw: 250, color: 300, backPage: 375, frontPage: 450, semiSolus: 400 },
        { market: 'Chhindwara', publication: 'Jabalpur Express (Hindi)', bw: 250, color: 300, backPage: 375, frontPage: 450, semiSolus: 400 },
        { market: 'Balaghat', publication: 'Jabalpur Express (Hindi)', bw: 250, color: 300, backPage: 375, frontPage: 450, semiSolus: 400 },
        { market: 'Bhopal', publication: 'Express News (Hindi)', bw: 250, color: 300, backPage: 375, frontPage: 450, semiSolus: 400 },
        { market: 'Bilaspur', publication: 'Express News (Hindi)', bw: 175, color: 250, backPage: 300, frontPage: 375, semiSolus: 350 },
        { market: 'Gwalior', publication: 'Express News (Hindi)', bw: 175, color: 250, backPage: 300, frontPage: 375, semiSolus: 350 },
        { market: 'Katni', publication: 'Express News (Hindi)', bw: 175, color: 250, backPage: 300, frontPage: 375, semiSolus: 350 },
    ];
    
    // टोटल की गणना
    const totals = {
        bw: tableData.reduce((sum, row) => sum + row.bw, 0),
        color: tableData.reduce((sum, row) => sum + row.color, 0),
        backPage: tableData.reduce((sum, row) => sum + row.backPage, 0),
        frontPage: tableData.reduce((sum, row) => sum + row.frontPage, 0),
        semiSolus: tableData.reduce((sum, row) => sum + row.semiSolus, 0),
    };

    return (
        <>
            <style>{styles}</style>
            <Container className="advertise-container">

                {/* ======================= Header Section ======================= */}
                <h1 className="ad-header-main">ADVERTISE WITH US</h1>
                <h2 className="ad-header-sub">For Print Publication</h2>
                <h2 className="ad-header-sub">JABALPUR EXPRESS & EXPRESS NEWS</h2>
                <p className="ad-header-contact">CONTACT : 9229226434, 9425008620</p>
                <p className="ad-header-email">expressnews.advt@gmail.com</p>

                {/* ======================= Rate Table Section ======================= */}
                <div className="rate-info">
                    <span className="rate-info-red">Commercial Rates w.e.f. 1st April 2022</span>
                </div>
                <div className="rate-info-blue">
                    <span>Individual Editions Wise Rates:</span>
                </div>

                <Table bordered className="rate-table">
                    <thead>
                        <tr>
                            <th>Market</th>
                            <th>Publications</th>
                            <th>B & W any page inside<br />(per sq.cm.)</th>
                            <th>Color any page inside<br />(per sq.cm.)</th>
                            <th>Back page page 3 color<br />(per sq.cm.)</th>
                            <th>Front page Solus<br />(per sq.cm.)</th>
                            <th>Front page Semi Solus<br />(per sq.cm.)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map((row, index) => (
                            <tr key={index}>
                                {/* ✅ यहाँ बदलाव किया गया है: स्टाइल को सीधे यहीं लगा दिया गया है */}
                                <td style={{ color: 'red', fontWeight: 'bold' }}>{row.market}</td>
                                <td>{row.publication}</td>
                                <td>{row.bw}</td>
                                <td>{row.color}</td>
                                <td>{row.backPage}</td>
                                <td>{row.frontPage}</td>
                                <td>{row.semiSolus}</td>
                            </tr>
                        ))}
                        <tr className="total-row">
                            <td colSpan="2">Total</td>
                            <td>{totals.bw}</td>
                            <td>{totals.color}</td>
                            <td>{totals.backPage}</td>
                            <td>{totals.frontPage}</td>
                            <td>{totals.semiSolus}</td>
                        </tr>
                    </tbody>
                </Table>

                {/* ======================= Market Coverage Section ======================= */}
                <div className="market-coverage-banner">
                    MARKET COVERAGE JABALPUR EXPRESS & EXPRESS NEWS
                </div>
                <div className="market-coverage-list">
                    <span className="edition-name">JABALPUR EDITION</span> - JABALPUR, SEONI, MANDLA, NARSINGPUR, DINDORI, KATNI, UMARIA, ANUPPUR, SHAHDOL <span className="edition-name">CHINDWARA EDITION</span> - CHINDWARA DISTRICT <span className="edition-name">BALAGHAT EDITION</span> - BALAGHAT DISTRICT <span className="edition-name">GWALIOR EDITION</span> - GWALIOR, BHIND, MURENA, SHIVPURI, ASHOK NAGAR, GUNA <span className="edition-name">KATNI EDITION</span> - KATNI, UMARIYA, SAHDOL, ANUPPUR, SATNA, REWA, SEEDHI, SINGROLI, DINDORI, DAMOH
                </div>

                {/* ======================= Digital Ad Sales Section ======================= */}
                <div className="digital-sales-section">
                    <p className="digital-sales-contact">FOR DIGITAL AD SALES CONTACT 9229226532</p>
                    <p className="digital-sales-email">Email : emsnews.india@gmail.com</p>
                </div>

            </Container>
        </>
    );
};

export default Advertise;