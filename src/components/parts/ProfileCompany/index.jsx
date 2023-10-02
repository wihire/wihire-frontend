import About from '@/components/parts/ProfileCompany/About';
import BasicInformation from '@/components/parts/ProfileCompany/BasicInformation';
import Jobs from '@/components/parts/ProfileCompany/Jobs';

const ProfileCompany = () => (
  <div className="flex flex-col gap-5">
    <section className="flex flex-col rounded-md bg-white p-8">
      <BasicInformation />

      <About />
    </section>

    <Jobs />
  </div>
);

export default ProfileCompany;
