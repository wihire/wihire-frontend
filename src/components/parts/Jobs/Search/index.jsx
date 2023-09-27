import TextInput from '@/components/elements/TextInput';

const Search = () => (
  <>
    <TextInput placeholder="Search by job title" isBlock className="col-span-6" />
    <TextInput placeholder="Search by company" isBlock className="col-span-6" />
  </>
);

export default Search;
