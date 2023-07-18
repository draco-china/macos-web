import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
  Label,
  RadioGroup,
  RadioGroupItem,
} from '@/components';
import getFaviconUrl from '@/lib/getFavicon';
import { useApps, useWindow } from '@/store';
import { useState } from 'react';

function AppStore() {
  const { actions } = useApps();
  const window = useWindow('app-store');
  const [state, setState] = useState({
    type: 'url',
    name: '',
    address: '',
    icon: '',
  });
  return (
    <Card className="border-0">
      <CardHeader>
        <CardTitle>添加应用</CardTitle>
        <CardDescription>添加一个新的应用到应用列表</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center justify-around space-x-6">
          <div className="flex flex-col items-center space-y-6">
            <Avatar className="h-20 w-20">
              <AvatarImage src={state.icon} alt={state.name} />
              <AvatarFallback>{state.name}</AvatarFallback>
            </Avatar>
            <Button size="sm">
              <Input
                id="file"
                type="file"
                className="hidden"
                accept="image/*"
                max={1}
                onChange={(e) => {
                  let files = e.target.files;
                  let file = files?.[0];

                  if (file) {
                    let reader = new FileReader();
                    reader.onload = (e) => {
                      let data = e.target?.result as string;
                      // data即为图片的base64编码
                      setState((prev) => ({ ...prev, icon: data }));
                    };

                    reader.readAsDataURL(file);
                  }
                }}
              />
              <Label htmlFor="file">上传图片</Label>
            </Button>
          </div>
          <div className="flex-1 space-y-6">
            <Input
              placeholder="应用名称"
              value={state.name}
              onChange={(e) => {
                setState((prev) => ({ ...prev, name: e.target.value }));
              }}
            />
            <Input
              placeholder="应用地址"
              value={state.address}
              onChange={(e) => {
                setState((prev) => ({ ...prev, address: e.target.value }));
                if (state.icon) return;
                getFaviconUrl(e.target.value).then((icon) => {
                  setState((prev) => ({ ...prev, icon }));
                });
              }}
            />
            <RadioGroup
              id="type"
              className="flex items-center"
              value={state.type}
              onValueChange={(value) => {
                setState((prev) => ({ ...prev, type: value }));
              }}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="url" id="url" />
                <Label htmlFor="url">外部窗口</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="iframe" id="iframe" />
                <Label htmlFor="iframe">应用窗口</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </CardContent>
      <CardFooter className="absolute bottom-0 left-0 flex w-full items-center justify-center space-x-6">
        <Button
          onClick={(e) => {
            e.stopPropagation();
            window.actions.close();
          }}
        >
          取消
        </Button>
        <Button
          onClick={() => {
            actions.add({
              id: Date.now().toString(),
              name: state.name,
              icon: state.icon,
              url: state.type === 'url' ? state.address : undefined,
              iframe: state.type === 'iframe' ? state.address : undefined,
            });
            setState({
              type: 'url',
              name: '',
              address: '',
              icon: '',
            });
          }}
        >
          添加
        </Button>
      </CardFooter>
    </Card>

    // <Form>
    //   <FormItem lable="应用名称" name="name">
    //     <Input />
    //   </FormItem>
    //   <FormItem lable="应用图标" name="icon">
    //     <Input />
    //   </FormItem>
    //   <FormItem lable="应用地址" name="url">
    //     <Input />
    //   </FormItem>
    //   <FormItem lable="窗口模式" name="url">
    //     <RadioGroup defaultValue="url">
    //       <div className="flex items-center space-x-2">
    //         <RadioGroupItem value="url" id="url" />
    //         <Label htmlFor="url">新窗口</Label>
    //       </div>
    //       <div className="flex items-center space-x-2">
    //         <RadioGroupItem value="iframe" id="iframe" />
    //         <Label htmlFor="iframe">集成窗口</Label>
    //       </div>
    //     </RadioGroup>
    //     <FormDescription>
    //       新窗口
    //       为打开新标签页;集成窗口为桌面窗口模式,此模式可能某些网站无法打开
    //     </FormDescription>
    //   </FormItem>
    // </Form>
  );
}

export default AppStore;
