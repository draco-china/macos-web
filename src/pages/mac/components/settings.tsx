import {
  Form,
  FormDescription,
  FormItem,
  Input,
  Label,
  RadioGroup,
  RadioGroupItem,
} from '@/components';

function AppStore() {
  return (
    <Form>
      <FormItem lable="应用名称" name="name">
        <Input />
      </FormItem>
      <FormItem lable="应用图标" name="icon">
        <Input />
      </FormItem>
      <FormItem lable="应用地址" name="url">
        <Input />
      </FormItem>
      <FormItem lable="窗口模式" name="url">
        <RadioGroup defaultValue="url">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="url" id="url" />
            <Label htmlFor="url">新窗口</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="iframe" id="iframe" />
            <Label htmlFor="iframe">集成窗口</Label>
          </div>
        </RadioGroup>
        <FormDescription>
          新窗口
          为打开新标签页;集成窗口为桌面窗口模式,此模式可能某些网站无法打开
        </FormDescription>
      </FormItem>
    </Form>
  );
}

export default AppStore;
