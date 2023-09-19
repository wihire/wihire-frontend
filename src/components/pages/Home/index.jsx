import Button from '@/components/elements/Button';
import Container from '@/components/elements/Container';
import FormControl from '@/components/elements/FormControl';
import Select from '@/components/elements/Select';
import TextInput from '@/components/elements/TextInput';

const Home = () => (
  <Container>
    <Button>Login</Button>
    <Button className="btn-neutral">Neutral</Button>
    <Button className="btn-secondary">Secondary</Button>
    <Button className="btn-accent">Accent</Button>
    <Button className="btn-ghost">Ghost</Button>
    <Button className="btn-link">Link</Button>

    <TextInput placeholder="Username" />

    <FormControl
      htmlFor="name"
      label="Name"
      labelAlt="This is a name"
      description="This is a description"
      descriptionAlt="1/100"
    >
      <TextInput id="name" placeholder="Name" />
    </FormControl>
    <FormControl
      htmlFor="address"
      label="Username"
      labelAlt="This is a address"
      description="This is a description"
      descriptionAlt="1/100"
      error="This is an error"
    >
      <TextInput id="address" placeholder="Address" />
    </FormControl>
    <TextInput type="file" />

    <Select
      options={[
        {
          value: 'React',
          label: 'React'
        },
        {
          value: 'Vue',
          label: 'Vue',
          isSelected: true
        },
        {
          value: 'Angular',
          label: 'Angular'
        }
      ]}
    />

    <FormControl
      htmlFor="language"
      label="Language"
      labelAlt="This is a name"
      description="This is a description"
      descriptionAlt="1/100"
    >
      <Select
        id="language"
        placeholder="Pick a framework"
        options={[
          {
            value: 'React',
            label: 'React'
          },
          {
            value: 'Vue',
            label: 'Vue'
          },
          {
            value: 'Angular',
            label: 'Angular'
          }
        ]}
      />
    </FormControl>
  </Container>
);

export default Home;
