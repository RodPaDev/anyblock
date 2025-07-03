
interface Props {
    params: {
        projectId: string;
    };
}

export default async function Page({ params }: Props) {
    const { projectId } = params;
    return (
        <div>
            Project ID: {projectId}
        </div>
    );

}