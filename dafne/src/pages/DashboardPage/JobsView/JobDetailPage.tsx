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
    const title = id ? `${id}` : 'userxyz_12345';
    const { data: jobStatus, isLoading, error } = useGetJobStatusByIdQuery(id ?? "userxyz_12345")

    const StatusComponent =
        <>
            <SizedBoxHorizontal />
            {
                jobStatus &&
                <ProcessStatus status={jobStatus.status as JobState} />
            }
        </>

    return (
        <>
            <PageHeader title={title} subtitle="Reproduction results" titleChildren={StatusComponent} />
            {
                jobStatus &&
                <JobDetail jobStatus={jobStatus} isLoading={isLoading} />
            }
        </>

    )
}

export default JobDetailPage