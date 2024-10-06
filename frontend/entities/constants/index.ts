export const Routes = Object.freeze({
    home: '/',
    feedback: '/feedback',
    jobList: '/jobs',
    jobById: (jobId: string | number) => `/jobs/${jobId}`,
})