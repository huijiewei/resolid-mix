import type { ModalProps } from '@resolid/mix-ui';
import { Button, Modal, Radio, RadioGroup } from '@resolid/mix-ui';
import { useRef, useState } from 'react';
import { FormExample } from './__FormExample';

export const ModalBasicDemo = () => {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Button onClick={() => setOpened(true)}>打开模态框</Button>
      <Modal.Root opened={opened} onClose={() => setOpened(false)}>
        <Modal.Overlay />
        <Modal.Content className={'w-11/12 tablet:w-3/5 laptop:w-1/3'}>
          <Modal.Header>模态框标题</Modal.Header>
          <Modal.CloseButton />
          <Modal.Body className={'p-3'}>模态框内容</Modal.Body>
          <Modal.Footer className={'flex items-center justify-center gap-5'}>
            <Button onClick={() => setOpened(false)}>关闭</Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal.Root>
    </>
  );
};

export const ModalCenteredDemo = () => {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Button onClick={() => setOpened(true)}>打开模态框</Button>
      <Modal.Root opened={opened} centered onClose={() => setOpened(false)}>
        <Modal.Overlay />
        <Modal.Content className={'w-11/12 tablet:w-3/5 laptop:w-1/3'}>
          <Modal.Header>模态框标题</Modal.Header>
          <Modal.CloseButton />
          <Modal.Body className={'p-3'}>模态框内容</Modal.Body>
          <Modal.Footer className={'flex items-center justify-center gap-5'}>
            <Button onClick={() => setOpened(false)}>关闭</Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal.Root>
    </>
  );
};

export const ModalUnlockScrollDemo = () => {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Button onClick={() => setOpened(true)}>打开模态框</Button>
      <Modal.Root lockScroll={false} opened={opened} onClose={() => setOpened(false)}>
        <Modal.Overlay />
        <Modal.Content className={'w-11/12 tablet:w-3/5 laptop:w-1/3'}>
          <Modal.Header>模态框标题</Modal.Header>
          <Modal.CloseButton />
          <Modal.Body className={'p-3'}>模态框内容</Modal.Body>
          <Modal.Footer className={'flex items-center justify-center gap-5'}>
            <Button onClick={() => setOpened(false)}>关闭</Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal.Root>
    </>
  );
};

export const ModalScrollBehaviorDemo = () => {
  const [opened, setOpened] = useState(false);
  const [scrollBehavior, setScrollBehavior] = useState<ModalProps['scrollBehavior']>('inside');

  return (
    <>
      <RadioGroup value={scrollBehavior} onChange={(value) => setScrollBehavior(value as ModalProps['scrollBehavior'])}>
        <div className={'mb-3 flex flex-row gap-5'}>
          <Radio value="inside">内部滚动</Radio>
          <Radio value="outside">外部滚动</Radio>
        </div>
      </RadioGroup>
      <Button onClick={() => setOpened(true)}>打开模态框</Button>
      <Modal.Root scrollBehavior={scrollBehavior} opened={opened} onClose={() => setOpened(false)}>
        <Modal.Overlay />
        <Modal.Content className={'w-11/12 tablet:w-3/5 laptop:w-1/3'}>
          <Modal.Header>M2 Pro 和 M2 Max MacBook Pro</Modal.Header>
          <Modal.CloseButton />
          <Modal.Body className={'prose p-3 dark:prose-invert'}>
            <p>
              苹果于 2023 年 1 月对 14 英寸和 16 英寸 MacBook Pro 机型进行了彻底改造，添加了下一代 M2 Pro 和 M2 Max
              芯片、增加了最大内存、更长的电池续航时间、支持 8K 显示的 HDMI 2.1、更快的 Wi-Fi 6E 以及 蓝牙5.3支持。
            </p>
            <p>
              2023 款 MacBook Pro 型号没有设计变化，并继续提供配备 mini-LED 显示屏的 14.2 英寸和 16.2 英寸尺寸选项。
              变化都是内部的，主要集中在更新的 M 系列芯片上。
            </p>
            <p>
              苹果的新款 M2 Pro 芯片提供最多 12 核 CPU 和最多 19 核 GPU，而 M2 Max 芯片提供 12 核 CPU 和最多 38 核 GPU。
              这两款芯片中的 CPU 均包含 8 个性能核心和 4 个效率核心，而 14 英寸 MacBook Pro 基本型号中的缩小版 M2 Pro
              则配备了 6 个性能核心和 4 个效率核心。
            </p>
            <p>
              M2 Pro 最高支持 32GB 统一内存，而 M2 Max 最高支持 96GB 统一内存，比之前 M1 Max 的 64GB 最大内存有所改进。
              M2 Pro 具有 200GB/s 统一内存带宽，而 M2 Max 具有 400GB/s 统一内存带宽。
            </p>
            <p>
              M2 Pro 的 GPU 速度比 M1 Pro 快 30%，可提高游戏图像处理性能，而 M2 Max GPU 速度比 M1 Max 快 30%。 M2 Pro 和
              M2 Max 继续采用 16 核神经引擎。
            </p>
            <p>
              14 英寸和 16 英寸 MacBook Pro 型号配备 Liquid Retina XDR 显示屏，这是一款迷你 LED 显示屏，持续亮度高达
              1000 尼特，峰值亮度为 1600 尼特，对比度为 1,000,000:1。 14 英寸 MacBook Pro 的分辨率为 3024 x 1964，每英寸
              254 像素，16 英寸型号的分辨率为 3456 x 2234，每英寸 254 像素。
            </p>
            <p>
              侧面和顶部都有纤薄的 3.5 毫米边框，显示屏顶部还采用凹口设计，可容纳 1080p 网络摄像头。 这两款显示器均配备
              ProMotion 技术，支持 24Hz 至 120Hz 的自适应刷新率。 其他显示技术包括可实现逼真色彩的 P3
              宽色和可改变显示屏白平衡以匹配房间照明的原彩显示技术。
            </p>
            <p>
              在设计方面，M2 MacBook Pro 型号与上一代 M1 MacBook Pro 型号相同，有银色和深空灰色可供选择。
              它有一个全黑键盘，带有一排全尺寸的功能键，以及一个带有圆形指纹传感器的 Touch ID 按钮。 Touch ID 用于解锁
              Mac、验证购买以及替换密码。 键盘下方有一个大型 Force Touch 触控板。
            </p>
            <p>
              Apple 使用相同的重新架构散热设计，即使使用更强大的 M2 Pro 和 M2 Max
              芯片，也能提供持续的性能，同时保持机器凉爽和安静。
            </p>
            <p>
              两款 MacBook Pro 型号均配备多个端口，包括一个 SDXC 卡插槽、一个 HDMI 2.1 端口、三个 USB-C Thunderbolt 4
              端口、一个支持高阻抗耳机的 3.5 毫米耳机插孔以及一个 MagSafe 3 端口，可让 快速充电功能可在 30 分钟内充电
              50%。 今年新增的 HDMI 2.1 端口支持高达 60Hz 的 8K 显示器和高达 240Hz 的 4K 显示器。
            </p>
            <p>
              16 英寸 MacBook Pro 使用 140W 电源适配器，而 14 英寸型号则根据 CPU 配置配备 67W 或 96W
              电源适配器，并且两台机器都可以通过 USB-C 或 MagSafe 充电。
            </p>
            <p>MacBook Pro 型号内置快速 SSD，两种型号均可配置高达 8TB 的存储空间。</p>
            <p>
              得益于新的 M2 Pro 和 M2 Max 芯片，MacBook Pro 型号的电池续航时间更长。 14 英寸 MacBook Pro
              看电影时续航时间长达 18 小时，浏览网页时续航时间长达 12 小时。 16 英寸 MacBook Pro 看电影时续航时间长达 22
              小时，浏览网页时续航时间长达 15 小时。
            </p>
            <p>
              其他功能包括 Wi-Fi 6E 和蓝牙 5.3 支持，Wi-Fi 6E 通过 6GHz 频段提供更快的无线连接和更低的延迟。 MacBook Pro
              型号还配备六扬声器音响系统，其中包括两个高音扬声器、四个力消除低音扬声器和宽广的立体声。
            </p>
            <p>
              14 英寸 MacBook Pro 起售价为 1,999 美元，16 英寸 MacBook Pro 起售价为 2,499
              美元，价格与上一代机器相比没有变化。
            </p>
          </Modal.Body>
          <Modal.Footer className={'flex items-center justify-center gap-5'}>
            <Button onClick={() => setOpened(false)}>关闭</Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal.Root>
    </>
  );
};

export const ModalFocusDemo = () => {
  const [opened, setOpened] = useState(false);
  const finalRef = useRef(null);

  return (
    <>
      <Button onClick={() => setOpened(true)}>打开模态框</Button>
      <Button color={'neutral'} ref={finalRef}>
        键盘关闭模态框后获得焦点
      </Button>
      <Modal.Root initialFocus={1} finalFocus={finalRef} opened={opened} onClose={() => setOpened(false)}>
        <Modal.Overlay />
        <Modal.Content className={'w-fit'}>
          <Modal.Header>模态框标题</Modal.Header>
          <Modal.CloseButton />
            <Modal.Body className={'flex flex-col gap-3 p-3'}>
              <FormExample />
            </Modal.Body>
            <Modal.Footer className={'flex gap-3 items-center justify-end'}>
              <Button type={'submit'}>提交</Button>
              <Button color={'neutral'} onClick={() => setOpened(false)}>
                取消
              </Button>
            </Modal.Footer>
        </Modal.Content>
      </Modal.Root>
    </>
  );
};

export const ModalOverlayStylingDemo = () => {
  const OverlayBlur = () => <Modal.Overlay className="backdrop-blur-sm" />;
  const OverlayHueRotate = () => <Modal.Overlay className="backdrop-hue-rotate-30" />;

  const [opened, setOpened] = useState(false);
  const [overlay, setOverlay] = useState(<OverlayBlur />);

  return (
    <>
      <Button
        onClick={() => {
          setOverlay(<OverlayBlur />);
          setOpened(true);
        }}
      >
        模糊样式
      </Button>
      <Button
        onClick={() => {
          setOverlay(<OverlayHueRotate />);
          setOpened(true);
        }}
      >
        色相变换样式
      </Button>
      <Modal.Root opened={opened} onClose={() => setOpened(false)}>
        {overlay}
        <Modal.Content className={'w-11/12 tablet:w-3/5 laptop:w-1/3'}>
          <Modal.Header>模态框标题</Modal.Header>
          <Modal.CloseButton />
          <Modal.Body className={'p-3'}>模态框内容</Modal.Body>
          <Modal.Footer className={'flex items-center justify-center gap-5'}>
            <Button onClick={() => setOpened(false)}>关闭</Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal.Root>
    </>
  );
};
