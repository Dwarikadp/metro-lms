// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
//  FULL COURSE DATA
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
const BASE_API_URL = "https://metro-lms-api.onrender.com";
const CD = {
  CRM:[
    {t:'SETUP',c:'Project',n:'Hierarchy Type',o:'Define levels (e.g., Phase, Block, Tower) to represent the physical layout of a real estate project.'},
    {t:'SETUP',c:'Project',n:'Project Hierarchy',o:'Map the physical structure of the project â€” how floors, towers, and phases connect.'},
    {t:'SETUP',c:'Project',n:'Owner Developer',o:'Manage Joint Venture (JV) or Stakeholder details linked to a project.'},
    {t:'SETUP',c:'Project',n:'Area Type Configurator',o:'Define rules for Super Built-up, Carpet, and Built-up area calculations.'},
    {t:'SETUP',c:'Project',n:'Area Type Configurator BU Wise',o:'Configure area calculation rules specific to each Business Unit.'},
    {t:'SETUP',c:'Project',n:'Housing Finance Company',o:'List all approved banks and NBFCs for home loan processing.'},
    {t:'SETUP',c:'Project',n:'Drawn On',o:'Define banks to be used for Cheque and DD issuance by the company.'},
    {t:'SETUP',c:'Project',n:'Cancel Reason',o:'Setup standard reasons for booking exits and cancellations.'},
    {t:'SETUP',c:'Project',n:'Month Wise Target & Achievement',o:'Set monthly sales targets and track actuals against goals.'},
    {t:'SETUP',c:'Payment Plan',n:'Schedule Type',o:'Categorize payment plans as Construction Linked, Time Linked, or Hybrid.'},
    {t:'SETUP',c:'Payment Plan',n:'Schedule',o:'Define specific milestone timelines for payment collection.'},
    {t:'SETUP',c:'Payment Plan',n:'Payment Plan',o:'Create master payment plans offered to buyers at the time of booking.'},
    {t:'SETUP',c:'Payment Plan',n:'Schedule Display Order',o:'Set the sequence in which installments appear on letters and reports.'},
    {t:'SETUP',c:'Payment Plan',n:'Plan Revenue Heads',o:'Link revenue heads like PLC, Club charges, or Parking to payment plans.'},
    {t:'SETUP',c:'Brokerage',n:'Broker Group',o:'Categorize brokers into groups such as internal vs external agents.'},
    {t:'SETUP',c:'Brokerage',n:'Broker',o:'Maintain a master register for individual broker details.'},
    {t:'SETUP',c:'Brokerage',n:'Brokerage Template',o:'Set commission percentage, slabs, and calculation logic for agents.'},
    {t:'SETUP',c:'Brokerage',n:'Brokerage Release',o:'Define the event that triggers brokerage payout (e.g., after booking).'},
    {t:'SETUP',c:'Brokerage',n:'Brokerage Template Tagging',o:'Link brokerage templates to specific projects.'},
    {t:'SETUP',c:'Revenue/Scheme',n:'Revenue Head',o:'Create individual revenue items such as Basic, PLC, Parking.'},
    {t:'SETUP',c:'Revenue/Scheme',n:'Revenue Type',o:'Define the nature of income â€” Fixed vs Variable.'},
    {t:'SETUP',c:'Revenue/Scheme',n:'Revenue Template',o:'Group revenue heads for faster unit pricing setup.'},
    {t:'SETUP',c:'Revenue/Scheme',n:'Discount Type',o:'Categorize discounts as Spot, Festive, or Employee discounts.'},
    {t:'SETUP',c:'Revenue/Scheme',n:'Discount Master',o:'Define specific discount amounts or percentages for each type.'},
    {t:'SETUP',c:'Revenue/Scheme',n:'Customer Status',o:'Track lead stage â€” Active, Lost, or Sold.'},
    {t:'SETUP',c:'Revenue/Scheme',n:'Customer Category',o:'Segment customers by type: NRI, Corporate, HNIs, etc.'},
    {t:'SETUP',c:'Demand/LPF',n:'Late Payment Setup',o:'Define rules for charging interest on overdue payments from buyers.'},
    {t:'SETUP',c:'Demand/LPF',n:'Late Payment Rate Template',o:'Set tiered interest rates based on number of overdue days.'},
    {t:'SETUP',c:'Demand/LPF',n:'Reminder Setup',o:'Configure intervals and templates for automated debt recovery reminders.'},
    {t:'SETUP',c:'Unit',n:'Unit',o:'Create and manage individual Flat, Plot, or Villa master records.'},
    {t:'SETUP',c:'Unit',n:'Unit Type',o:'Classify units as 1BHK, 2BHK, Penthouse, etc.'},
    {t:'SETUP',c:'Unit',n:'Unit Operational Status',o:'Manage unit status transitions: Available, Sold, Blocked.'},
    {t:'SETUP',c:'Unit',n:'Floor Master',o:'Configure floor numbers and floor-level attributes.'},
    {t:'SETUP',c:'Unit',n:'Facing Master',o:'Set facing directions like North, East, or Pool Facing.'},
    {t:'SETUP',c:'Integration',n:'Posting Template',o:'Map CRM transactions to corresponding Accounts module entries.'},
    {t:'SETUP',c:'Integration',n:'Revenue Head Posting',o:'Map GL accounts for each specific income type.'},
    {t:'SETUP',c:'Portal',n:'News Feed',o:'Update company news and announcements visible to customers on the portal.'},
    {t:'SETUP',c:'Portal',n:'Project Photo Library',o:'Manage the photo gallery displayed on the customer portal.'},
    {t:'SETUP',c:'Portal',n:'Terms and Conditions',o:'Publish legal terms and conditions for portal users.'},
    {t:'SETUP',c:'Invoice Master',n:'Invoice Master Setup',o:'Configure the final Tax Invoice layout, numbering series, and format.'},
    {t:'Transaction',c:'Pricing',n:'Pricelist',o:'View and select active price rates for a specific project and unit type.'},
    {t:'Transaction',c:'Pricing',n:'Quotation',o:'Generate a formal cost estimate for a prospective lead or buyer.'},
    {t:'Transaction',c:'Pricing',n:'Block Unit',o:'Temporarily hold a unit for a prospect without confirming the sale.'},
    {t:'Transaction',c:'Booking',n:'Customer Details',o:'Input KYC information and personal profile data of the buyer.'},
    {t:'Transaction',c:'Booking',n:'Application Details',o:'Process the initial purchase application form submitted by the buyer.'},
    {t:'Transaction',c:'Booking',n:'Booking',o:'Convert a confirmed application into an official confirmed sale.'},
    {t:'Transaction',c:'Booking',n:'Agreement',o:'Generate and track the Agreement for Sale document.'},
    {t:'Transaction',c:'Booking',n:'Allotment',o:'Issue the formal Unit Allotment Letter to the confirmed buyer.'},
    {t:'Transaction',c:'Booking',n:'Offer Of Possession',o:'Send formal notice to the buyer that their unit is ready for handover.'},
    {t:'Transaction',c:'Booking',n:'No Due Certificate',o:'Issue clearance certificate after all payments are fully settled.'},
    {t:'Transaction',c:'Booking',n:'Possession',o:'Record the final handover of unit keys to the buyer.'},
    {t:'Transaction',c:'Invoicing',n:'Invoice',o:'Generate official Tax Invoices for payment demands as per milestones.'},
    {t:'Transaction',c:'Invoicing',n:'Credit Note',o:'Issue credits for returns or price adjustments to the buyer.'},
    {t:'Transaction',c:'Collection',n:'Receipt',o:'Record money received from buyers via Cheque, DD, or NEFT.'},
    {t:'Transaction',c:'Collection',n:'Receipt/PDC Reversal',o:'Handle bounced cheques or correct entry errors in receipts.'},
    {t:'Transaction',c:'Collection',n:'Payment to Customer',o:'Process refunds for cancellations or excess payments.'},
    {t:'Transaction',c:'Brokerage',n:'Broker Invoice',o:'Record the invoice submitted by an agent for their commission.'},
    {t:'Transaction',c:'Query',n:'Status Matrix',o:'View the current stage of all active units across the project.'},
    {t:'Transaction',c:'Query',n:'Applicant Ledger',o:'View full statement of account for a specific buyer.'},
    {t:'Transaction',c:'Query',n:'Customer Outstanding',o:'View list of buyers with pending payment dues.'},
    {t:'Report',c:'Unit Status',n:'Available Unit',o:'List of all units currently open and available for sale.'},
    {t:'Report',c:'Unit Status',n:'Booked Unit',o:'List of all units that have been sold or occupied.'},
    {t:'Report',c:'Registration',n:'Booking Register Summary',o:'Brief overview of all confirmed sales across the project.'},
    {t:'Report',c:'Registration',n:'Customer Journey Report',o:'Track the buyer\'s complete path from Lead to Possession.'},
    {t:'Report',c:'Collection',n:'Receipt Register Summary',o:'Summary of total money collected from buyers.'},
    {t:'Report',c:'Outstanding',n:'Customer Outstanding Summary',o:'Project-wise totals of all unpaid customer balances.'},
    {t:'Report',c:'Management',n:'Sales Details',o:'Comprehensive sales data export for management analysis.'},
    {t:'Report',c:'Compliance',n:'Rera Report',o:'Data summary formatted for RERA regulatory filing requirements.'},
  ],
  ELC:[
    {t:'Setup',c:'Recruitment',n:'Skill Master',o:'Define technical and soft skills required for different roles.'},
    {t:'Setup',c:'Recruitment',n:'Competency Category',o:'Create groupings for employee capabilities and competencies.'},
    {t:'Setup',c:'Recruitment',n:'Competency Master',o:'Build master list of all measurable competencies for evaluation.'},
    {t:'Setup',c:'Recruitment',n:'Test Criteria Master',o:'Configure rules and scoring logic for recruitment tests.'},
    {t:'Setup',c:'Recruitment',n:'Language Master',o:'List languages for proficiency tracking in employee profiles.'},
    {t:'Setup',c:'Appointment',n:'Signatory Master',o:'Define authorities authorized to sign appointment letters.'},
    {t:'Setup',c:'Appointment',n:'Hospital Master',o:'Register clinics and hospitals for pre-employment medical checks.'},
    {t:'Setup',c:'Appointment',n:'Agency Master',o:'List external recruitment agencies used for hiring.'},
    {t:'Setup',c:'Interview',n:'Interview Round',o:'Define interview stages such as Technical, HR, and Management rounds.'},
    {t:'Setup',c:'Interview',n:'Interview Panel',o:'Assign specific managers to interview panels and boards.'},
    {t:'Setup',c:'Question',n:'Question Group',o:'Categorize interview questions by type (Logical, Domain, etc.).'},
    {t:'Setup',c:'Question',n:'Question Master',o:'Build the actual bank of test and interview questions.'},
    {t:'Setup',c:'Confirmation',n:'Employee Confirmation Evaluation Setup',o:'Define rules for moving employees from probation to permanent status.'},
    {t:'Setup',c:'Performance',n:'KRA',o:'Define Key Result Areas for employee performance evaluation.'},
    {t:'Setup',c:'Performance',n:'KPI',o:'Define Key Performance Indicators and measurable metrics.'},
    {t:'Setup',c:'Performance',n:'Appraisal Period Setup',o:'Define appraisal cycles such as Quarterly or Annual reviews.'},
    {t:'Setup',c:'Portal Setup',n:'Company Policy Master',o:'Central repository for all corporate policies.'},
    {t:'Setup',c:'Configuration',n:'Department Wise HOD',o:'Assign Heads of Department for approval workflows.'},
    {t:'Transaction',c:'Recruitment',n:'Man Power Budget',o:'Manage and track approved budgets for headcount hiring.'},
    {t:'Transaction',c:'Recruitment',n:'Post Request',o:'Raise internal requests to open a new job vacancy.'},
    {t:'Transaction',c:'Recruitment',n:'Job Application',o:'Enter and track incoming candidate resumes and applications.'},
    {t:'Transaction',c:'Interview',n:'Interview Cycle',o:'Manage the full workflow for scheduled interview stages.'},
    {t:'Transaction',c:'Interview',n:'Interview Result',o:'Record scores and feedback from the interview panel.'},
    {t:'Transaction',c:'Pre Joining',n:'Candidate Master',o:'Central repository for all selected candidate records.'},
    {t:'Transaction',c:'Pre Joining',n:'CTC Entry',o:'Enter detailed breakup of the offered Cost to Company package.'},
    {t:'Transaction',c:'Pre Joining',n:'Offer Issue',o:'Generate and deliver the official Offer Letter.'},
    {t:'Transaction',c:'Pre Joining',n:'Candidate Join',o:'Trigger the final step to move a candidate to Employee status.'},
    {t:'Transaction',c:'Post Joining',n:'Employee Join Cycle',o:'Manage first-day onboarding and system account activation.'},
    {t:'Transaction',c:'Post Joining',n:'Appointment Letter',o:'Issue the formal legal employment contract.'},
    {t:'Transaction',c:'Post Joining',n:'Bank Allocate',o:'Assign salary accounts and configure payment disbursement modes.'},
    {t:'Transaction',c:'Post Joining',n:'Employee PF',o:'Set up Provident Fund contribution details for the employee.'},
    {t:'Transaction',c:'Employee Related',n:'Role Assignment',o:'Define job titles, grades, and departmental duties.'},
    {t:'Transaction',c:'Employee Related',n:'Resignation Apply',o:'Record the formal submission of an employee\'s notice period.'},
    {t:'Transaction',c:'Employee Documents',n:'Confirmation Letter',o:'Generate the official letter confirming permanent employment status.'},
    {t:'Transaction',c:'Employee Documents',n:'Increment Letter',o:'Document salary hike and revision for the employee record.'},
    {t:'Transaction',c:'Employee Documents',n:'Experience Letter',o:'Generate standard experience letter for years of service.'},
    {t:'Transaction',c:'Training',n:'Training Program',o:'Organize and launch specific skill development courses.'},
    {t:'Transaction',c:'Training',n:'Training Nomination',o:'Process managerial approval for employees to attend training courses.'},
    {t:'Transaction',c:'Exit Process',n:'NOC Clearance Entry',o:'Track departmental No Objection sign-offs during employee exit.'},
    {t:'Report',c:'Employee Related MIS',n:'Employee Status Report',o:'View current employment status of all staff members.'},
    {t:'Report',c:'Employee Related MIS',n:'Employee Joining Report',o:'Audit trail of all recent staff onboarding activities.'},
    {t:'Report',c:'Employee Related MIS',n:'Employee Leaving Report',o:'Audit of all recent staff exits and separations.'},
    {t:'Report',c:'Performance Evaluation',n:'Performance Scorecard',o:'Detailed appraisal scores and evaluation results for employees.'},
  ],
  Payroll:[
    {t:'Setup',c:'Earnings Setup',n:'Earnings Master',o:'Define all positive salary components such as Basic, HRA, and Conveyance.'},
    {t:'Setup',c:'Earnings Setup',n:'Deduction Master',o:'Configure all salary subtractions including PF, ESI, and Income Tax.'},
    {t:'Setup',c:'Earnings Setup',n:'Pay Structure Master',o:'Group earnings and deductions into reusable template structures.'},
    {t:'Setup',c:'Earnings Setup',n:'Grade Master',o:'Define employee hierarchy levels for pay scale management.'},
    {t:'Setup',c:'Earnings Setup',n:'Grade Wise Head Value Setup',o:'Assign specific currency values to pay components by employee grade.'},
    {t:'Setup',c:'Earnings Setup',n:'Loan Scheme Master',o:'Configure rules and terms for employee company loan schemes.'},
    {t:'Setup',c:'Leave Setup',n:'Leave Master',o:'Create different leave buckets such as CL, SL, and PL.'},
    {t:'Setup',c:'Leave Setup',n:'Day Type Master',o:'Define day types: Working Day, Weekly Off, or Holiday.'},
    {t:'Setup',c:'Attendance',n:'Shift Master',o:'Define working hours, grace periods, and break times for shifts.'},
    {t:'Setup',c:'Attendance',n:'Missed Punch Setup',o:'Define rules for regularizing forgotten biometric scan entries.'},
    {t:'Setup',c:'Attendance',n:'Offday Setup',o:'Configure rotational and fixed weekly off days.'},
    {t:'Setup',c:'Localisation',n:'Statutory Master',o:'Setup professional tax and labor welfare fund statutory rules.'},
    {t:'Setup',c:'Localisation',n:'Tax Scheme Master',o:'Configure income tax slabs and calculation logic.'},
    {t:'Setup',c:'Biometric',n:'Punch Card Master',o:'Map physical biometric ID cards to employee system profiles.'},
    {t:'Setup',c:'Posting Setup',n:'Account Posting Category',o:'Categorize payroll costs for accounting integration.'},
    {t:'Setup',c:'Posting Setup',n:'Accounts Ledger Tag',o:'Link specific pay heads to individual GL ledgers.'},
    {t:'Setup',c:'Configuration',n:'Preference Setup',o:'General system-wide payroll preferences and configurations.'},
    {t:'Setup',c:'Configuration',n:'PaySlip Show',o:'Define which salary components are visible on the employee pay slip.'},
    {t:'Setup',c:'Configuration',n:'Alert Configuration',o:'Set triggers for payroll notifications and automated reminders.'},
    {t:'Setup',c:'Basic Masters',n:'Department Master',o:'Define organizational units such as Sales, Finance, and IT.'},
    {t:'Setup',c:'Basic Masters',n:'Designation Master',o:'Maintain master list of corporate job titles and levels.'},
    {t:'Setup',c:'Basic Masters',n:'Holiday Master',o:'Maintain the actual annual company holiday calendar.'},
    {t:'Setup',c:'Basic Masters',n:'Bank Master',o:'Maintain master list of banks used for payroll disbursements.'},
    {t:'Transaction',c:'Attendance',n:'Leave Application',o:'Process and approve employee leave requests in the system.'},
    {t:'Transaction',c:'Attendance',n:'Attendance Regularization',o:'Correct attendance records for missed or incorrect entries.'},
    {t:'Transaction',c:'Attendance',n:'OT Approval',o:'Approve overtime hours worked by employees.'},
    {t:'Transaction',c:'Payroll Processing',n:'Payroll Run',o:'Execute the monthly payroll calculation for all employees.'},
    {t:'Transaction',c:'Payroll Processing',n:'Salary Revision',o:'Process salary hikes and grade revisions for employees.'},
    {t:'Transaction',c:'Payroll Processing',n:'Loan Processing',o:'Disburse and track company loans to employees.'},
    {t:'Transaction',c:'Payroll Processing',n:'Full & Final Settlement',o:'Process complete dues calculation for exiting employees.'},
    {t:'Transaction',c:'Statutory',n:'PF Challan',o:'Generate Provident Fund payment challans for government filing.'},
    {t:'Transaction',c:'Statutory',n:'TDS Computation',o:'Compute Tax Deducted at Source on employee salaries.'},
    {t:'Transaction',c:'Expense',n:'Expense Claim',o:'Submit and process employee expense reimbursement claims.'},
    {t:'Report',c:'Attendance Related',n:'Biometric Attendance Register',o:'View complete biometric attendance log for all employees.'},
    {t:'Report',c:'Attendance Related',n:'Leave Register',o:'Complete leave balance and utilization report.'},
    {t:'Report',c:'Payroll Reports',n:'Pay Slip',o:'Individual salary statement for each employee.'},
    {t:'Report',c:'Payroll Reports',n:'Salary Register',o:'Complete salary register with all components for a month.'},
    {t:'Report',c:'Statutory Reports',n:'PF Report',o:'Monthly Provident Fund contribution report.'},
    {t:'Report',c:'Statutory Reports',n:'TDS Report',o:'Tax Deducted at Source monthly and annual summary.'},
    {t:'Report',c:'Statutory Reports',n:'Form 16',o:'Annual tax certificate issued to employees.'},
  ],
  Administration:[
    {t:'Setup',c:'Company',n:'Enterprise Config',o:'Configure global system-wide settings for the legal entity.'},
    {t:'Setup',c:'Company',n:'Business Unit (BU)',o:'Setup and manage individual project or branch Business Units.'},
    {t:'Setup',c:'Company',n:'Document Type',o:'Define categories for all system-generated documents.'},
    {t:'Setup',c:'Company',n:'Entry Type',o:'Configure logic for different data entry voucher types.'},
    {t:'Setup',c:'Fiscal Year',n:'Fiscal Year Template',o:'Create the structural calendar template for the financial year.'},
    {t:'Setup',c:'Fiscal Year',n:'Fiscal Year Generation',o:'Generate the next operational financial year in the system.'},
    {t:'Setup',c:'Fiscal Year',n:'BU - FY Tagging',o:'Link specific Business Units to their active financial years.'},
    {t:'Setup',c:'Security',n:'Profile',o:'Define high-level access profiles such as Accountant or Manager.'},
    {t:'Setup',c:'Security',n:'User',o:'Create and manage individual login accounts and personal settings.'},
    {t:'Setup',c:'Security',n:'User - Profile Tagging',o:'Map individual users to their specific security access profiles.'},
    {t:'Setup',c:'Security',n:'User - BU Tagging',o:'Restrict users to view only specific projects or business units.'},
    {t:'Setup',c:'Security',n:'User Menu Rights',o:'Define which specific sidebar menus a user can access.'},
    {t:'Setup',c:'Security',n:'User Date Restriction',o:'Set time limits on how far back or forward a user can enter data.'},
    {t:'Setup',c:'Security',n:'Active Users',o:'Monitor currently logged-in users and manage session activity.'},
    {t:'Setup',c:'Security',n:'OTP Based Login',o:'Configure Two-Factor Authentication for enhanced system security.'},
    {t:'Setup',c:'Workflow',n:'Approval Action',o:'Define what Approve, Reject, or Forward actions do in workflows.'},
    {t:'Setup',c:'Workflow',n:'Business Rule',o:'Configure logic-based triggers that determine when a workflow starts.'},
    {t:'Setup',c:'Workflow',n:'Vacation Rule',o:'Set temporary redirection of tasks when an approver is away.'},
    {t:'Setup',c:'Database',n:'Metadata',o:'Manage the underlying data structure and field definitions.'},
    {t:'Setup',c:'Database',n:'User Metadata',o:'Configure custom data fields defined specifically for user profiles.'},
    {t:'Setup',c:'Communicator',n:'Register - Email',o:'Manage the register of all automated email communications.'},
    {t:'Setup',c:'Communicator',n:'Register - SMS',o:'Manage the register of all automated SMS notifications.'},
    {t:'Setup',c:'API Integration',n:'API Keys',o:'Generate and manage API keys for external system integration.'},
    {t:'Setup',c:'API Integration',n:'External API Config',o:'Configure connections to external APIs and third-party services.'},
    {t:'Setup',c:'Geography',n:'Country Master',o:'Maintain the country master list for addresses and records.'},
    {t:'Setup',c:'Geography',n:'State Master',o:'Maintain the state and province master list.'},
    {t:'Setup',c:'Geography',n:'City Master',o:'Maintain the city master list for all locations.'},
    {t:'Setup',c:'Security',n:'Reset Password',o:'Administrative tool for overriding and updating user passwords.'},
    {t:'Setup',c:'Security',n:'Error Logs',o:'Review system-generated logs for troubleshooting issues.'},
    {t:'Setup',c:'Security',n:'User Rights History',o:'Audit trail of all changes made to user permissions over time.'},
  ]
};

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
//  MODULE META
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
const MM = {
  CRM:            {label:'CRM Module',          icon:'ðŸ¢',bar:'#3b82f6',color:'#3b82f6'},
  ELC:            {label:'Employee Life Cycle',  icon:'ðŸ‘¥',bar:'#8b5cf6',color:'#8b5cf6'},
  Payroll:        {label:'Payroll Module',       icon:'ðŸ’°',bar:'#10b981',color:'#10b981'},
  Administration: {label:'Administration',       icon:'âš™ï¸',bar:'#f59e0b',color:'#f59e0b'}
};

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
//  STATE
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
let S = {
  user: null, modules: [],
  done: {},       // 'CRM::Hierarchy Type' => true  (quiz passed)
  quizR: {},      // 'CRM' => {passed,score}
  curMod: null, curCat: null, curView: 'dash'
};

function save() { try { localStorage.setItem('mg_fv', JSON.stringify({user:S.user,modules:S.modules,done:S.done,quizR:S.quizR})); } catch(e){} }

// â”€â”€ BACKEND API SYNC â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const API_TOKEN = localStorage.getItem('mg_token') || '';
const API_USER  = JSON.parse(localStorage.getItem('mg_user') || 'null');

async function apiPost(path, body, retries = 2) {
  for (let i = 0; i <= retries; i++) {
    try {
      const res = await fetch(path, {
        method:  'POST',
        headers: {
          'Content-Type':  'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('mg_token')
        },
        body: JSON.stringify(body)
      });
      if (res.ok) return;
      console.warn('apiPost non-ok:', res.status, path);
      return;
    } catch(e) {
      if (i < retries) {
        await new Promise(r => setTimeout(r, 1000 * (i + 1)));
      } else {
        console.warn('Sync failed after retries (offline?):', path, e.message);
        // Queue for later retry (store in localStorage)
        try {
          const q = JSON.parse(localStorage.getItem('mg_sync_queue') || '[]');
          q.push({ path, body, t: Date.now() });
          localStorage.setItem('mg_sync_queue', JSON.stringify(q.slice(-20)));
        } catch(_) {}
      }
    }
  }
}

// Flush any queued sync items when connection restores
async function flushSyncQueue() {
  const q = JSON.parse(localStorage.getItem('mg_sync_queue') || '[]');
  if (!q.length) return;
  const remaining = [];
  for (const item of q) {
    try {
      const res = await fetch(BASE_API_URL + item.path, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('mg_token') },
        body: JSON.stringify(item.body)
      });
      if (!res.ok) remaining.push(item);
    } catch(e) { remaining.push(item); }
  }
  localStorage.setItem('mg_sync_queue', JSON.stringify(remaining));
  if (q.length !== remaining.length) {
    console.log(`âœ“ Flushed ${q.length - remaining.length} queued sync items`);
  }
}

async function syncTopic(module, topic) {
  await apiPost('/api/me/progress/topic', { module, topic, score: 100 });
}

async function syncQuiz(module, score, passed) {
  await apiPost('/api/me/quiz', { module, quiz_type: 'module', score, passed });
}

async function syncCertificate(modules, scores) {
 const res = await fetch(BASE_API_URL + '/api/me/certificate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('mg_token') },
    body: JSON.stringify({ modules, scores })
  });
  return res.ok ? await res.json() : null;
}
function load() {
  try {
    const d = JSON.parse(localStorage.getItem('mg_fv')||'{}');
    if(d.user){S.user=d.user;S.modules=d.modules||[];S.done=d.done||{};S.quizR=d.quizR||{};return true;}
  } catch(e){}
  return false;
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
//  HELPERS
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
function topics(m){ return CD[m]||[]; }
function doneCount(m){ return topics(m).filter(t=>S.done[m+'::'+t.n]).length; }
function pct(m){ const tot=topics(m).length; return tot?Math.round(doneCount(m)/tot*100):0; }
function ovPct(){ let d=0,t=0; S.modules.forEach(m=>{d+=doneCount(m);t+=topics(m).length;}); return t?Math.round(d/t*100):0; }
function passed(m){ return S.quizR[m]&&S.quizR[m].passed; }
function allDone(){ return S.modules.every(m=>pct(m)===100&&passed(m)); }
function initials(n){ return n.split(' ').map(w=>w[0]).slice(0,2).join('').toUpperCase(); }

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
//  QUIZ GENERATION
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
function genQ(topic, allTopics){
  const distractors = allTopics.filter(x=>x.n!==topic.n).sort(()=>Math.random()-0.5).slice(0,3);
  const opts = [topic.o, ...distractors.map(x=>x.o)].sort(()=>Math.random()-0.5);
  return {
    q: `What is the purpose of "${topic.n}"?`,
    opts, correct: opts.indexOf(topic.o),
    explain: `"${topic.n}": ${topic.o}`
  };
}
function genModuleQuiz(mod){
  const all = topics(mod);
  return all.sort(()=>Math.random()-0.5).slice(0,10).map(t=>genQ(t,all));
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
//  SCREENS
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
function showScreen(id){ document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active')); document.getElementById(id).classList.add('active'); }
function showApp(){ showScreen('screen-app'); renderTopBar(); renderSidebar(); if(S.curView==='dash')renderDash(); }

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
//  LOGIN
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
function logout(){ localStorage.removeItem('mg_fv'); localStorage.removeItem('mg_token'); localStorage.removeItem('mg_user'); window.location.href='/'; }

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
//  TOP BAR
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
function renderTopBar(){
  const p=ovPct();
  document.getElementById('tb-pct').textContent=p+'%';
  document.getElementById('tb-bar').style.width=p+'%';
  document.getElementById('tb-av').textContent=initials(S.user.name);
  document.getElementById('tb-name').textContent=S.user.name+' Â· '+S.user.role;
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
//  SIDEBAR
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
function renderSidebar(){
  let h=`<div class="sb-section"><div class="sb-label">My Modules</div>`;
  S.modules.forEach(m=>{
    const active=S.curMod===m?'active':'';
    h+=`<button class="mod-btn ${active}" onclick="selMod('${m}')">
      <span class="mod-dot" style="background:${MM[m].bar}"></span>${MM[m].label}
      <span class="mod-pct">${pct(m)}%</span>
    </button>`;
  });
  h+=`</div><div class="sb-section"><div class="sb-label">Navigation</div>
    <button class="mod-btn ${S.curView==='dash'?'active':''}" onclick="renderDash()">ðŸ“Š Dashboard</button>
  </div>`;
  if(S.curMod){
    const all=topics(S.curMod), cats=[...new Set(all.map(t=>t.c))];
    h+=`<div class="sb-section"><div class="sb-label">Categories</div><ul class="cat-list">`;
    cats.forEach(cat=>{
      const ct=all.filter(t=>t.c===cat);
      const dc=ct.filter(t=>S.done[S.curMod+'::'+t.n]).length;
      const allCatDone=dc===ct.length;
      const active=S.curCat===cat?'active':'';
      h+=`<li class="cat-row ${active}" onclick="selCat('${cat}')">
        <span class="cat-dot ${allCatDone?'done':''}"></span>
        ${cat}
        <span class="cat-count">${dc}/${ct.length}</span>
      </li>`;
    });
    h+=`</ul></div>`;
    const qr=S.quizR[S.curMod];
    h+=`<div class="sb-section"><div class="sb-label">Module Quiz</div>
      <button class="mod-btn" onclick="startModuleQuiz('${S.curMod}')" style="background:${qr?.passed?'rgba(16,185,129,0.1)':'rgba(201,162,39,0.08)'};border:1px solid ${qr?.passed?'rgba(16,185,129,0.25)':'rgba(201,162,39,0.2)'};color:${qr?.passed?'#10b981':'#c9a227'}">
        ${qr?.passed?'âœ… Passed ('+qr.score+'%)':'ðŸ“ Take Quiz'}
      </button>
    </div>`;
  }
  document.getElementById('sidebar').innerHTML=h;
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
//  DASHBOARD
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
function renderDash(){
  S.curView='dash'; S.curMod=null; S.curCat=null;
  renderSidebar(); renderTopBar();
  let done=0,tot=0; S.modules.forEach(m=>{done+=doneCount(m);tot+=topics(m).length;});
  const qp=S.modules.filter(m=>passed(m)).length;
  const p=ovPct();
  let h=`<div class="animate-in">
    <div class="page-head"><h1>Welcome back, ${S.user.name} ðŸ‘‹</h1><p>Continue your Farvision ERP training â€” Metro Group Certification Program</p></div>
    <div class="grid4">
      <div class="stat s-gold"><div class="stat-val">${p}%</div><div class="stat-lbl">Overall Progress</div><div class="stat-bar"><div class="stat-bar-fill" style="width:${p}%;background:linear-gradient(90deg,var(--accent),var(--accent3))"></div></div></div>
      <div class="stat s-green"><div class="stat-val">${done}</div><div class="stat-lbl">Topics Completed</div><div class="stat-bar"><div class="stat-bar-fill" style="width:${tot?Math.round(done/tot*100):0}%;background:var(--green)"></div></div></div>
      <div class="stat s-blue"><div class="stat-val">${tot-done}</div><div class="stat-lbl">Topics Remaining</div><div class="stat-bar"><div class="stat-bar-fill" style="width:${tot?Math.round((tot-done)/tot*100):0}%;background:var(--blue)"></div></div></div>
      <div class="stat s-purple"><div class="stat-val">${qp}/${S.modules.length}</div><div class="stat-lbl">Quizzes Passed</div><div class="stat-bar"><div class="stat-bar-fill" style="width:${Math.round(qp/S.modules.length*100)}%;background:var(--purple)"></div></div></div>
    </div>
    <div style="font-size:14px;font-weight:700;color:var(--text2);margin-bottom:14px;font-family:'Space Grotesk',sans-serif;letter-spacing:0.5px;text-transform:uppercase">Your Modules</div>
    <div class="mod-grid">`;
  S.modules.forEach(m=>{
    const mp=pct(m), qr=S.quizR[m];
    h+=`<div class="mod-card" onclick="selMod('${m}')">
      <div class="mod-card-hd">
        <div class="mod-icon" style="background:${MM[m].color}18">${MM[m].icon}</div>
        <div><h3>${MM[m].label}</h3><p>${topics(m).length} topics Â· ${[...new Set(topics(m).map(t=>t.c))].length} categories</p></div>
      </div>
      <div class="mc-bar-row"><span>${doneCount(m)}/${topics(m).length} done</span><span style="font-weight:700;color:${MM[m].color}">${mp}%</span></div>
      <div class="mc-bar"><div class="mc-bar-fill" style="width:${mp}%;background:${MM[m].bar}"></div></div>
      <div style="margin-top:12px;display:flex;gap:6px;flex-wrap:wrap">
        ${qr?.passed?`<span class="badge b-green">âœ“ Quiz ${qr.score}%</span>`:`<span class="badge b-amber">Quiz pending</span>`}
        ${mp===100?`<span class="badge b-green">âœ“ Complete</span>`:''}
      </div>
    </div>`;
  });
  h+=`</div>`;
  if(allDone()){
    h+=`<div style="margin-top:28px;background:linear-gradient(135deg,rgba(201,162,39,0.12),rgba(139,92,246,0.08));border:1px solid rgba(201,162,39,0.3);border-radius:16px;padding:28px 32px;display:flex;align-items:center;justify-content:space-between;gap:20px">
      <div>
        <div style="font-size:20px;font-weight:800;font-family:'Space Grotesk',sans-serif;margin-bottom:6px">ðŸŽ‰ Congratulations! Training Complete!</div>
        <div style="color:var(--text2);font-size:14px">All modules complete and all quizzes passed. Your certificate is ready.</div>
      </div>
      <button class="btn btn-gold" style="white-space:nowrap" onclick="showCert()">ðŸŽ“ Get Certificate</button>
    </div>`;
  }
  h+=`</div>`;
  document.getElementById('main').innerHTML=h;
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
//  MODULE / CATEGORY SELECTION
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
function selMod(m){ S.curMod=m; S.curCat=null; S.curView='mod'; renderSidebar(); renderModView(m); }
function selCat(c){ S.curCat=c; S.curView='cat'; renderSidebar(); renderCatTopics(S.curMod,c); }

function renderModView(m){
  const all=topics(m), cats=[...new Set(all.map(t=>t.c))];
  const types=[...new Set(all.map(t=>t.t))];
  let h=`<div class="animate-in">
    <div class="breadcrumb"><span class="bc-link" onclick="renderDash()">Dashboard</span><span class="bc-sep">â€º</span><span>${MM[m].label}</span></div>
    <div class="page-head"><h1>${MM[m].icon} ${MM[m].label}</h1><p>${all.length} topics across ${cats.length} categories Â· ${pct(m)}% complete</p></div>`;
  types.forEach(type=>{
    const tCats=[...new Set(all.filter(t=>t.t===type).map(t=>t.c))];
    h+=`<div class="sec-hdr"><h3>${type}</h3><div class="sec-line"></div></div>`;
    tCats.forEach(cat=>{
      const ct=all.filter(t=>t.c===cat&&t.t===type), dc=ct.filter(t=>S.done[m+'::'+t.n]).length;
      h+=`<div class="topic-card" style="cursor:pointer" onclick="selCat('${cat}')">
        <div class="t-num">ðŸ“</div>
        <div class="t-body"><div class="t-name">${cat}</div><div class="t-obj">${ct.length} topics</div></div>
        <div class="t-right"><span class="badge ${dc===ct.length?'b-green':'b-amber'}">${dc}/${ct.length}</span><span style="color:var(--text3);font-size:12px">â€º</span></div>
      </div>`;
    });
  });
  h+=`</div>`;
  document.getElementById('main').innerHTML=h;
}

function renderCatTopics(m,cat){
  const all=topics(m), catTs=all.filter(t=>t.c===cat);
  let h=`<div class="animate-in">
    <div class="breadcrumb"><span class="bc-link" onclick="renderDash()">Dashboard</span><span class="bc-sep">â€º</span><span class="bc-link" onclick="selMod('${m}')">${MM[m].label}</span><span class="bc-sep">â€º</span><span>${cat}</span></div>
    <div class="page-head"><h1>${cat}</h1><p>${catTs.length} topics Â· complete all and score â‰¥80% on each mini-quiz to unlock the next category</p></div>
    <div class="topic-list">`;
  catTs.forEach((t,i)=>{
    const key=m+'::'+t.n, done=S.done[key];
    const tc=t.t.toLowerCase()==='setup'?'type-setup':t.t.toLowerCase()==='transaction'?'type-transaction':'type-report';
    h+=`<div class="topic-card ${done?'done':''}" onclick="openTopic('${m}','${cat}',${all.indexOf(t)})">
      <div class="t-num">#${String(i+1).padStart(2,'0')}</div>
      <div class="t-body"><div class="t-name">${t.n}</div><div class="t-obj">${t.o}</div></div>
      <div class="t-right"><span class="t-type ${tc}">${t.t}</span>${done?'<span class="badge b-green" style="font-size:10px">âœ“ Done</span>':''}
      </div>
    </div>`;
  });
  h+=`</div></div>`;
  document.getElementById('main').innerHTML=h;
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
//  TOPIC LEARN VIEW
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
function openTopic(m,cat,idx){
  S.curMod=m; S.curCat=cat; S.curView='topic';
  renderSidebar();
  const all=topics(m), t=all[idx];
  const catTs=all.filter(x=>x.c===cat), catIdx=catTs.indexOf(t);
  const key=m+'::'+t.n, done=S.done[key];
  const tc=t.t.toLowerCase()==='setup'?'type-setup':t.t.toLowerCase()==='transaction'?'type-transaction':'type-report';

  let h=`<div class="animate-in">
    <div class="breadcrumb"><span class="bc-link" onclick="renderDash()">Dashboard</span><span class="bc-sep">â€º</span><span class="bc-link" onclick="selMod('${m}')">${MM[m].label}</span><span class="bc-sep">â€º</span><span class="bc-link" onclick="selCat('${cat}')">${cat}</span><span class="bc-sep">â€º</span><span>${t.n}</span></div>
    <div class="learn-layout">
      <div>
        <div class="learn-card">
          <div class="learn-cat-row"><span class="t-type ${tc}">${t.t}</span><span style="font-size:12px;color:var(--text3)">ðŸ“ ${cat}</span></div>
          <div class="learn-title">${t.n}</div>
          <div class="learn-block">
            <h4>What is it?</h4>
            <p>${t.o}</p>
          </div>
          <div class="learn-block">
            <h4>Why it matters</h4>
            <p>In Farvision ERP, <strong style="color:var(--accent)">${t.n}</strong> is a key feature under <em>${cat}</em>. Proper configuration ensures smooth operations and accurate record-keeping across the platform. Misconfigurations here can affect downstream transactions and reports.</p>
          </div>
          <div class="learn-block">
            <h4>Key points</h4>
            <ul>
              <li>This belongs to <strong style="color:var(--accent)">${cat}</strong> under the <strong>${t.t}</strong> section</li>
              <li>Always verify data before saving â€” some actions trigger automated workflows</li>
              <li>Access is controlled by your security profile and Business Unit assignment</li>
              <li>Contact your system administrator if you encounter permission restrictions</li>
            </ul>
          </div>
          <div class="learn-block">
            <h4>Training objective</h4>
            <p style="font-style:italic;color:var(--text)">"${t.o}"</p>
          </div>
          <div class="learn-nav">
            ${catIdx>0?`<button class="btn btn-ghost btn-sm" onclick="openTopic('${m}','${cat}',${all.indexOf(catTs[catIdx-1])})">â† Prev</button>`:''}
            <button class="btn ${done?'btn-ghost':'btn-gold'} btn-sm" id="mark-btn" onclick="${done?'':'launchMiniQuiz(\''+m+'\',\''+t.n+'\',\''+cat+'\','+idx+')'}">
              ${done?'âœ“ Completed':'ðŸ“ Mark & Quiz'}
            </button>
            ${catIdx<catTs.length-1?`<button class="btn btn-blue btn-sm" onclick="openTopic('${m}','${cat}',${all.indexOf(catTs[catIdx+1])})">Next â†’</button>`:`<button class="btn btn-green btn-sm" onclick="selCat('${cat}')">Category Done âœ“</button>`}
          </div>
        </div>
      </div>
      <div>
        <div class="nav-pane">
          <div class="nav-pane-hd">Topics in ${cat}</div>
          <div class="nav-list">`;

  catTs.forEach((ct,ci)=>{
    const cdone=S.done[m+'::'+ct.n], isCurr=ci===catIdx;
    h+=`<div class="nav-item ${isCurr?'curr':cdone?'done-nav':''}" onclick="openTopic('${m}','${cat}',${all.indexOf(ct)})">
      <span class="nav-dot ${isCurr?'nd-curr':cdone?'nd-done':''}"></span>
      <span style="flex:1">${ct.n}</span>
      ${cdone&&!isCurr?'<span class="lock-icon">âœ“</span>':''}
    </div>`;
  });
  h+=`</div></div></div></div></div>`;
  document.getElementById('main').innerHTML=h;
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
//  MINI-QUIZ (per subtopic, 3 Qs, need 80% = 3/3 or 2/2 or 2/3)
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
let MQ = { mod:'', topicName:'', cat:'', topicIdx:0, qs:[], idx:0, ans:[], answered:false, score:0 };

function launchMiniQuiz(m, tn, cat, tIdx){
  const all=topics(m), t=all[tIdx];
  const qs=[genQ(t,all)];
  const extra=all.filter(x=>x.c===cat&&x.n!==tn).sort(()=>Math.random()-0.5).slice(0,2).map(x=>genQ(x,all));
  qs.push(...extra);
  MQ={ mod:m, topicName:tn, cat, topicIdx:tIdx, qs, idx:0, ans:[], answered:false, score:0 };
  document.getElementById('mq-title').textContent='Quick Knowledge Check';
  document.getElementById('mq-sub').textContent=`"${tn}" â€” ${qs.length} questions Â· Need â‰¥80% to mark complete`;
  renderMiniQ();
  document.getElementById('mq-overlay').classList.add('show');
}

function renderMiniQ(){
  const {qs, idx, ans, answered} = MQ;
  const q=qs[idx], total=qs.length;
  const letters=['A','B','C','D'];
  let h=`<div class="mq-prog-row">
    <span class="mq-prog-txt">Q${idx+1} of ${total}</span>
    <div class="mq-score-bar" style="flex:1"><div class="mq-score-fill" style="width:${Math.round(idx/total*100)}%;background:var(--accent)"></div></div>
  </div>
  <div class="mq-num">Question ${idx+1} of ${total}</div>
  <div class="mq-q">${q.q}</div>
  <div class="mq-opts">`;
  q.opts.forEach((opt,oi)=>{
    let cls='';
    if(answered){ if(oi===q.correct)cls='show-correct'; else if(oi===ans[idx]&&oi!==q.correct)cls='wrong'; }
    else if(ans[idx]===oi)cls='sel';
    h+=`<div class="mq-opt ${cls}" onclick="${answered?'':'mqSel('+oi+')'}">
      <span class="opt-l">${letters[oi]}</span>${opt}
    </div>`;
  });
  h+=`</div>`;
  if(answered){
    const ok=ans[idx]===q.correct;
    h+=`<div class="mq-fb ${ok?'fb-ok':'fb-no'}">${ok?'âœ… Correct! ':'âŒ Incorrect. '}${q.explain}</div>`;
    h+=`<div class="mq-actions"><button class="btn btn-gold btn-sm" onclick="${idx<total-1?'mqNext()':'mqFinish()'}">${idx<total-1?'Next â†’':'See Result'}</button></div>`;
  } else {
    h+=`<div class="mq-actions"><button class="btn btn-blue btn-sm" ${ans[idx]===undefined?'disabled':''} onclick="mqSubmit()">Submit</button></div>`;
  }
  document.getElementById('mq-body').innerHTML=h;
}

function mqSel(oi){ if(MQ.answered)return; MQ.ans[MQ.idx]=oi; renderMiniQ(); }
function mqSubmit(){
  MQ.answered=true;
  if(MQ.ans[MQ.idx]===MQ.qs[MQ.idx].correct) MQ.score++;
  renderMiniQ();
}
function mqNext(){ MQ.idx++; MQ.answered=false; renderMiniQ(); }
function mqFinish(){
  const pct=Math.round(MQ.score/MQ.qs.length*100);
  const pass=pct>=80;
  const m=MQ.mod, tn=MQ.topicName, cat=MQ.cat, tIdx=MQ.topicIdx;
  const all=topics(m);
  const letters=['A','B','C','D'];
  let h=`<div class="mq-result">
    <div style="font-size:40px">${pass?'ðŸŽ‰':'ðŸ˜•'}</div>
    <div class="score-big ${pass?'score-pass':'score-fail'}">${pct}%</div>
    <div class="r-lbl">${pass?'Passed!':'Not Passed'}</div>
    <div class="r-sub">${MQ.score}/${MQ.qs.length} correct Â· ${pass?'Topic marked as complete!':'You need â‰¥80% to pass. Study and retry.'}</div>
    <div class="mq-actions" style="justify-content:center;gap:10px">`;
  if(pass){
    h+=`<button class="btn btn-green btn-sm" onclick="mqAccept('${m}','${tn}','${cat}',${tIdx})">Continue â†’</button>`;
  } else {
    h+=`<button class="btn btn-ghost btn-sm" onclick="closeMQ()">Review Topic</button>
        <button class="btn btn-gold btn-sm" onclick="retryMQ('${m}','${tn}','${cat}',${tIdx})">Retry Quiz</button>`;
  }
  h+=`</div></div>`;
  document.getElementById('mq-body').innerHTML=h;
}

function mqAccept(m,tn,cat,tIdx){
  S.done[m+'::'+tn]=true; save();
  syncTopic(m, tn);
  closeMQ(); renderTopBar();
  // advance to next topic in category
  const all=topics(m), catTs=all.filter(t=>t.c===cat), t=all[tIdx], ci=catTs.indexOf(t);
  if(ci<catTs.length-1){ setTimeout(()=>openTopic(m,cat,all.indexOf(catTs[ci+1])),200); }
  else { selCat(cat); }
}
function closeMQ(){ document.getElementById('mq-overlay').classList.remove('show'); }
function retryMQ(m,tn,cat,tIdx){ launchMiniQuiz(m,tn,cat,tIdx); }

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
//  MODULE QUIZ (10 Qs, need 80%)
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
let MdQ = { mod:'', qs:[], idx:0, ans:[], answered:false, score:0 };

function startModuleQuiz(m){
  MdQ={ mod:m, qs:genModuleQuiz(m), idx:0, ans:[], answered:false, score:0 };
  S.curView='modquiz'; renderSidebar(); renderModQuiz();
}

function renderModQuiz(){
  const {qs,idx,ans,answered,mod}=MdQ;
  const q=qs[idx], total=qs.length, letters=['A','B','C','D'];
  let h=`<div class="animate-in"><div class="quiz-wrap">
    <div class="quiz-hd">
      <div style="font-size:20px;font-weight:800;font-family:'Space Grotesk',sans-serif;margin-bottom:4px">${MM[mod].label} â€” Module Quiz</div>
      <div style="font-size:13px;color:var(--text2)">Test your knowledge Â· Need â‰¥80% to pass</div>
      <div style="display:flex;align-items:center;gap:10px;margin-top:14px">
        <span style="font-size:12px;color:var(--text3)">Q${idx+1}/${total}</span>
        <div style="flex:1;height:4px;background:var(--bg3);border-radius:2px;overflow:hidden"><div style="height:100%;width:${Math.round(idx/total*100)}%;background:linear-gradient(90deg,var(--blue),var(--purple));border-radius:2px;transition:width 0.4s"></div></div>
        <span style="font-size:12px;font-weight:700;color:var(--blue)">${Math.round(idx/total*100)}%</span>
      </div>
    </div>
    <div class="quiz-q-card">
      <div class="quiz-q-num">Question ${idx+1} of ${total}</div>
      <div class="quiz-q-txt">${q.q}</div>
      <div class="quiz-opts">`;
  q.opts.forEach((opt,oi)=>{
    let cls='';
    if(answered){ if(oi===q.correct)cls='show-correct'; else if(oi===ans[idx]&&oi!==q.correct)cls='wrong'; }
    else if(ans[idx]===oi)cls='sel';
    h+=`<div class="q-opt ${cls}" onclick="${answered?'':'mdqSel('+oi+')'}">
      <span class="opt-l">${letters[oi]}</span>${opt}
    </div>`;
  });
  h+=`</div>`;
  if(answered){
    const ok=ans[idx]===q.correct;
    h+=`<div class="q-fb ${ok?'ok':'no'}">${ok?'âœ… Correct! ':'âŒ Incorrect. '}${q.explain}</div>`;
    h+=`<div class="q-actions"><button class="btn btn-gold btn-sm" onclick="${idx<total-1?'mdqNext()':'mdqFinish()'}">${idx<total-1?'Next Question â†’':'See Results'}</button></div>`;
  } else {
    h+=`<div class="q-actions"><button class="btn btn-blue btn-sm" ${ans[idx]===undefined?'disabled':''} onclick="mdqSubmit()">Submit Answer</button></div>`;
  }
  h+=`</div></div></div>`;
  document.getElementById('main').innerHTML=h;
}

function mdqSel(oi){ if(MdQ.answered)return; MdQ.ans[MdQ.idx]=oi; renderModQuiz(); }
function mdqSubmit(){ MdQ.answered=true; if(MdQ.ans[MdQ.idx]===MdQ.qs[MdQ.idx].correct)MdQ.score++; renderModQuiz(); }
function mdqNext(){ MdQ.idx++; MdQ.answered=false; renderModQuiz(); }
function mdqFinish(){
  const p=Math.round(MdQ.score/MdQ.qs.length*100), pass=p>=80, m=MdQ.mod;
  S.quizR[m]={passed:pass,score:p,date:new Date().toLocaleDateString()}; save();
  syncQuiz(m, p, pass);
  if(pass && allDone()) {
    const mods = S.modules;
    const scores = {};
    mods.forEach(mod => { scores[mod] = S.quizR[mod]?.score || 0; });
    syncCertificate(mods, scores);
  }
  const h=`<div class="animate-in" style="padding:20px 0">
    <div class="result-card ${pass?'pass-card':'fail-card'}">
      <div style="font-size:56px">${pass?'ðŸ†':'ðŸ“š'}</div>
      <div class="r-score ${pass?'score-pass':'score-fail'}">${p}%</div>
      <div style="font-size:20px;font-weight:800;font-family:'Space Grotesk',sans-serif;margin-bottom:8px">${pass?'Module Passed!':'Not Passed Yet'}</div>
      <div style="font-size:14px;color:var(--text2);margin-bottom:24px">${MdQ.score} of ${MdQ.qs.length} correct Â· ${pass?'Excellent work!':'You need 80% to pass. Review the topics and retry.'}</div>
      <div style="padding:14px 16px;border-radius:var(--r2);background:${pass?'rgba(16,185,129,0.08)':'rgba(239,68,68,0.08)'};border:1px solid ${pass?'rgba(16,185,129,0.2)':'rgba(239,68,68,0.2)'};font-size:13px;color:${pass?'var(--green)':'var(--red)'};margin-bottom:24px">
        ${pass?`âœ… "${MM[m].label}" quiz completed successfully!`:`Score: ${p}% â€” Need â‰¥80% to pass`}
      </div>
      <div class="r-btns">
        <button class="btn btn-ghost btn-sm" onclick="selMod('${m}')">â† Back to Module</button>
        ${!pass?`<button class="btn btn-gold btn-sm" onclick="startModuleQuiz('${m}')">Retry Quiz</button>`:''}
        ${pass&&allDone()?`<button class="btn btn-green btn-sm" onclick="showCert()">Get Certificate ðŸŽ“</button>`:''}
      </div>
    </div>
  </div>`;
  document.getElementById('main').innerHTML=h;
  renderSidebar(); renderTopBar();
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
//  CERTIFICATE
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
function showCert(){
  showScreen('screen-cert');
  const u=S.user;
  document.getElementById('cert-name').textContent=u.name;
  document.getElementById('cert-role').textContent=u.role+' Â· Employee ID: '+u.id;
  const modNames=S.modules.map(m=>MM[m].label).join(', ');
  const scores=S.modules.map(m=>`${MM[m].label} (${S.quizR[m]?.score||0}%)`).join(', ');
  document.getElementById('cert-body').innerHTML=`has successfully completed the comprehensive <strong>Farvision ERP Training Program</strong><br>at <strong>Metro Group</strong>, demonstrating proficiency across all assigned modules.<br><br>Modules: <em>${modNames}</em><br>Performance: <em>${scores}</em>`;
  document.getElementById('cert-mods').innerHTML=S.modules.map(m=>`<span class="cert-mod">${MM[m].icon} ${MM[m].label} Â· ${S.quizR[m]?.score||0}%</span>`).join('');
  const today=new Date().toLocaleDateString('en-IN',{year:'numeric',month:'long',day:'numeric'});
  document.getElementById('cert-date').textContent=today;
  const cid='MG-FV-'+u.id.toUpperCase()+'-'+Date.now().toString(36).toUpperCase().slice(-6);
  document.getElementById('cert-id').innerHTML='Certificate ID<br>'+cid+'<br>metro-farvision.com';
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
//  INIT
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
window.onload = () => {
  // Clear any old standalone-mode data that doesn't have a backend token
  const hasToken = !!localStorage.getItem('mg_token');
  if (!hasToken) {
    localStorage.removeItem('mg_fv');
  }

  const token    = localStorage.getItem('mg_token');
  const userData = localStorage.getItem('mg_user');

  // No token at all â€” send to login page
  if (!token || !userData) {
    window.location.href = '/';
    return;
  }

  const backendUser = JSON.parse(userData);

  // Verify token is still valid with backend
  fetch(BASE_API_URL + '/api/auth/verify', {
    headers: { 'Authorization': 'Bearer ' + token }
  })
  .then(r => r.json())
  .then(d => {
    if (!d.valid) {
      // Token expired or invalid â€” clear and redirect
      localStorage.removeItem('mg_token');
      localStorage.removeItem('mg_user');
      localStorage.removeItem('mg_fv');
      window.location.href = '/';
      return;
    }
    // Valid â€” load their data and show the app
    S.user    = { name: backendUser.name, id: backendUser.emp_id, role: backendUser.role };
    S.modules = Array.isArray(backendUser.modules) ? backendUser.modules : backendUser.modules.split(',');
    S.done    = {};
    S.quizR   = {};
    loadBackendProgress().then(() => { flushSyncQueue(); showApp(); });
  })


  .catch(() => {
    // Backend offline â€” try localStorage fallback
    if (load() && S.user) {
      showApp();
    } else {
      window.location.href = '/';
    }
  });
};

async function loadBackendProgress() {
  try {
    const token = localStorage.getItem('mg_token');
    const res = await fetch(BASE_API_URL + '/api/me/progress', {
      headers: { 'Authorization': 'Bearer ' + token }
    });

    if (!res.ok) throw new Error('API error ' + res.status);

    const data = await res.json();

    // Restore every completed topic
    if (data.progress && data.progress.length) {
      data.progress.forEach(p => {
        if (p.completed) {
          S.done[p.module + '::' + p.topic] = true;
        }
      });
    }

    // Restore best quiz score per module
    if (data.quiz_results && data.quiz_results.length) {
      data.quiz_results.forEach(q => {
        const existing = S.quizR[q.module];
        if (!existing || q.score > (existing.score || 0)) {
          S.quizR[q.module] = { passed: !!q.passed, score: q.score };
        }
      });
    }

    // Restore certificate flag
    if (data.certificate) {
      S.certId = data.certificate.cert_id;
    }

    S.done  = S.done  || {};
    S.quizR = S.quizR || {};

    // Save to localStorage so offline fallback has latest data
    save();

    const topicCount = Object.keys(S.done).length;
    const quizCount  = Object.keys(S.quizR).length;
    console.log(`âœ“ Progress restored: ${topicCount} topics, ${quizCount} module quizzes`);

  } catch(e) {
    console.warn('Backend unreachable â€” loading from localStorage:', e.message);
    load();
  }
}