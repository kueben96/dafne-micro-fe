import React from 'react'
import PageHeader from '../../../components/PageHeader'
import JobDetail from '../../ReproductionPage/JobDetail'
import { useParams } from 'react-router-dom'
import { SizedBoxHorizontal } from '../../../assets/theme/dafneStyles'
import ProcessStatus from '../../../components/ProcessStatus'
import { JobState } from '../../../types/enums'
import { useGetJobStatusByIdQuery } from '../../../redux/apiGatewaySlice'

const JobDetailPage = () => {
    const { id } = useParams<{ id: string }>()

    const { data: jobStatus, isLoading } = useGetJobStatusByIdQuery(id ?? "userxyz_12345")


    const title = jobStatus ? jobStatus.job.jobName : 'Job Detail with Job Name'

    const StatusComponent =
        <>
            <SizedBoxHorizontal />
            {
                jobStatus &&
                <ProcessStatus status={jobStatus.status as JobState} />
            }
        </>

    if (isLoading) {
        return (
            <div>isLoading...</div>
        )
    }

    return (
        <>
            <PageHeader title={title}
                subtitle="Reproduction results"
                titleChildren={StatusComponent}
                subsubtitle={jobStatus?.job.jobId} />
            {
                jobStatus &&
                <JobDetail jobStatus={jobStatus} isLoading={isLoading} />
            }
        </>

    )
}

export default JobDetailPage