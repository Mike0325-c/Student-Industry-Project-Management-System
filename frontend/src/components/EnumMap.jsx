export function getUserRole(role) {
    const roleMap = {
        1: 'Student',
        2: 'IndustryPartner',
        3: 'AcademicSupervisor',
    }
    return roleMap[role] || 'Unknown';
}

export function getOpportunityType(opportunityType) { 
    const opportunityTypeMap = {
        1: 'Internship',
        2: 'IndividualProject',
        3: 'GroupProject',
    };
    return opportunityTypeMap[opportunityType] || 'Unknown';
}

export function getPaymentType(paymentType) {
    const PaymentTypeMap = {
        1: 'Paid',
        2: 'Unpaid',
    };
    return PaymentTypeMap[paymentType] || 'Unknown';
}

export function getJobType(JobType) {
    const JobTypeMap = {
        1: 'Information Technology',
        2: 'Accounting',
        3: 'Banking',
        4: 'Engineering',
        5: 'Sports',
        6: 'Business',
        7: 'Media'
    };
    return JobTypeMap[JobType] || 'Unknown';
}
