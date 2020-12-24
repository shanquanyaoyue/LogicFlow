import { observable, action } from 'mobx';
import { PointTuple } from '../type';

export interface TransfromInterface {
  SCALE_X: number;
  SKEW_Y: number;
  SKEW_X: number;
  SCALE_Y: number;
  TRANSLATE_X: number;
  TRANSLATE_Y: number;
  ZOOM_SIZE: number;
  MINI_SCALE_SIZE: number; // 缩小的最小值
  MAX_SCALE_SIZE: number; // 放大的最大值
  zoom: (isZoomout: boolean) => boolean;
  HtmlPointToCanvasPoint: (point: PointTuple) => PointTuple;
  CanvasPointToHtmlPoint: (point: PointTuple) => PointTuple;
  moveCanvasPointByHtml: (point: PointTuple, x: number, y: number) => PointTuple;
}

export default class TransfromModel implements TransfromInterface {
  MINI_SCALE_SIZE = 0.2;
  MAX_SCALE_SIZE = 16;
  @observable SCALE_X = 1;
  @observable SKEW_Y = 0;
  @observable SKEW_X = 0;
  @observable SCALE_Y = 1;
  @observable TRANSLATE_X = 0;
  @observable TRANSLATE_Y = 0;
  @observable ZOOM_SIZE = 0.04;

  setZoomMiniSize(size: number): void {
    this.MINI_SCALE_SIZE = size;
  }

  setZoomMaxSize(size: number): void {
    this.MAX_SCALE_SIZE = size;
  }

  /**
   * 将最外层graph上的点基于缩放转换为canvasOverlay层上的点。
   * @param param0 HTML点
   */
  HtmlPointToCanvasPoint([x, y]: PointTuple): PointTuple {
    return [(x - this.TRANSLATE_X) / this.SCALE_X, (y - this.TRANSLATE_Y) / this.SCALE_Y];
  }

  /**
   * 将最外层canvasOverlay层上的点基于缩放转换为graph上的点。
   * @param param0 HTML点
   */
  CanvasPointToHtmlPoint([x, y]: PointTuple): PointTuple {
    return [x * this.SCALE_X + this.TRANSLATE_X, y * this.SCALE_Y + this.TRANSLATE_Y];
  }

  /**
   * 将一个在canvas上的点，向x轴方向移动directionX距离，向y轴方向移动dirctionY距离。
   * 因为canvas可能被缩小或者放大了，所以其在canvas层移动的距离需要计算上缩放的量。
   * @param point 点
   * @param directionX x轴距离
   * @param directionY y轴距离
   */
  moveCanvasPointByHtml([x, y]: PointTuple, directionX: number, directionY: number): PointTuple {
    return [x + directionX / this.SCALE_X, y + directionY / this.SCALE_Y];
  }

  /**
   * 根据缩放情况，获取缩放后的delta距离
   * @param deltaX x轴距离变化
   * @param deltaY y轴距离变化
   */
  fixDeltaXY(deltaX: number, deltaY: number): PointTuple {
    return [deltaX / this.SCALE_X, deltaY / this.SCALE_Y];
  }

  @action
  zoom(isZoomIn = false, point?: PointTuple): boolean {
    const size = isZoomIn ? this.ZOOM_SIZE : -this.ZOOM_SIZE;
    if (size < 0 && this.SCALE_X <= this.MINI_SCALE_SIZE) {
      return false;
    }
    if (size > 0 && this.SCALE_X >= this.MAX_SCALE_SIZE) {
      return false;
    }
    this.SCALE_X += size;
    this.SCALE_Y += size;
    if (point) {
      this.TRANSLATE_X -= size * point[0];
      this.TRANSLATE_Y -= size * point[1];
    }
    return true;
  }

  @action
  resetZoom() : void {
    this.SCALE_X = 1;
    this.SCALE_Y = 1;
  }

  @action
  translate(x: number, y: number) {
    this.TRANSLATE_X += x;
    this.TRANSLATE_Y += y;
  }

  /**
   * 将图形定位到画布中心
   * @param targetX 图形当前x坐标
   * @param targetY 图形当前y坐标
   * @param width 画布宽
   * @param height 画布高
   */
  @action
  focusOn(targetX: number, targetY: number, width: number, height: number) {
    const [x, y] = this.CanvasPointToHtmlPoint([targetX, targetY]);
    const [deltaX, deltaY] = [width / 2 - x, height / 2 - y];
    this.TRANSLATE_X += deltaX;
    this.TRANSLATE_Y += deltaY;
  }
}
